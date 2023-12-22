import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import { getItinerary, getDestinations } from '../api/editPage.js';
import { getRoutes, postRoutes } from '../api/editPage.js';
import { auth_actions, useAuthDispatch } from '../contexts/AuthContext';
import {
  tripInfo_actions,
  useTripInfo,
  useTripInfoDispatch,
} from '../contexts/TripInfoContext';
import {
  routesInfo_actions,
  useRoutesInfoDispatch,
} from '../contexts/RoutesInfoContext';
import { joinRoom } from '../socket/socketManager.jsx';
import { socket } from '../socket/socket.jsx';

export function useFetchDataAndCheckAuth() {
  const { itineraryId } = useParams();
  const tripInfoDispatch = useTripInfoDispatch();
  const authDispatch = useAuthDispatch();
  const routesInfoDispatch = useRoutesInfoDispatch();
  const destinations = useTripInfo().destinations;

  useEffect(() => {
    // fetch the data of a certain itinerary
    const fetchItinerary = async () => {
      const data = await getItinerary(itineraryId);
      if (data.statusCode && data.statusCode === 404) {
        tripInfoDispatch({
          type: tripInfo_actions.SET_IS_FAILED,
          payload: true,
        });
        return false;
      }
      const startTime = moment(data.startTime);
      const endTime = moment(data.endTime);
      const itinerary_data = {
        totalDays: endTime.diff(startTime, 'days') + 1,
        itineraryId: data.id,
        title: data.title,
        image: data.image,
        startTime: data.startTime,
        endTime: data.endTime,
        participants: data.ParticipantsUser,
      };
      tripInfoDispatch({
        type: tripInfo_actions.SET_ITINERARY,
        payload: itinerary_data,
      });
      return itinerary_data;
    };

    // check if a user has edit-permission
    const auth = (itinerary_data) => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (!userInfo) return; // 若使用者未登入則阻擋後續授權程序
      const userId = Number(userInfo.id);
      const authorizedIds = itinerary_data.participants.map(
        (participant) => participant.id
      );
      const authStatus = authorizedIds.includes(userId);
      authDispatch({
        type: auth_actions.SET_CAN_EDIT,
        payload: authStatus,
      });
    };

    // fetch the destinations of a certain itinerary
    const fetchDestinations = async (itinerary_data) => {
      const itineraryId = itinerary_data.itineraryId;
      const totalDays = itinerary_data.totalDays;
      const startDate = moment(itinerary_data.startTime.split('T')[0]);
      const destinations_data = [];
      // fetch the destinations by days
      for (let i = 0; i < totalDays; i++) {
        const date = startDate.clone().add(i, 'days').format('YYYY-MM-DD');
        const data = await getDestinations(itineraryId, date);
        destinations_data.push([]);
        data?.forEach((item) =>
          destinations_data[i].push({
            destinationId: item.id,
            date: item.date,
            placeId: item.Place.id,
            placeName: item.Place.name,
            placeAddress: item.Place.address,
            placeIntro: item.Place.intro,
            placeImage: item.Place.image,
            placeUrl: item.Place.url,
            placeLatLng: { lat: item.Place.lat, lng: item.Place.lng },
          })
        );
      }
      tripInfoDispatch({
        type: tripInfo_actions.SET_DESTINATIONS,
        payload: destinations_data,
      });
      tripInfoDispatch({
        type: tripInfo_actions.SET_IS_Loaded,
        payload: true,
      });
    };

    fetchItinerary().then((itinerary_data) => {
      if (!itinerary_data) return;
      auth(itinerary_data);
      fetchDestinations(itinerary_data);
    });
  }, []);

  useEffect(() => {
    // generate PlacePairs (origin & destination pairs) array
    const genPlacePairs = (destinations) => {
      const placePairs = [];
      destinations.forEach((_, day) => {
        placePairs.push([]);
        destinations[day].forEach((_, order) => {
          if (order === destinations[day].length - 1) return;
          const placePair = {
            originId: destinations[day][order].placeId,
            destinationId: destinations[day][order + 1].placeId,
          };
          placePairs[day].push(placePair);
        });
      });
      return placePairs;
    };

    // fetch the data of routes
    const fetchRoutes = async (destinations) => {
      if (destinations.length === 0) return;
      const placePairs = genPlacePairs(destinations);
      const newRoutes = [];
      for (let day = 0; day < placePairs.length; day++) {
        newRoutes.push([]);
        for (let order = 0; order < placePairs[day].length; order++) {
          const originId = placePairs[day][order].originId;
          const destinationId = placePairs[day][order].destinationId;
          let route = await getRoutes(itineraryId, originId, destinationId);
          if (!route) {
            const reqBody = {
              itineraryId: itineraryId,
              transportationMode: 'walking', // 預設值walking
              originId: originId,
              destinationId: destinationId,
            };
            route = await postRoutes(reqBody);
          }
          newRoutes[day].push(route);
        }
      }
      routesInfoDispatch({
        type: routesInfo_actions.SET_ROUTES,
        payload: newRoutes,
      });
      routesInfoDispatch({
        type: routesInfo_actions.SET_IS_Loaded,
        payload: true,
      });
    };

    fetchRoutes(destinations);
  }, [destinations]);
}

// Websocket for co-editing function on EditPage
export function useEditPageSocket() {
  const { itineraryId } = useParams();
  const tripInfoDispatch = useTripInfoDispatch();
  const routesInfoDispatch = useRoutesInfoDispatch();

  useEffect(() => {
    function handleReceiveDestinations(data) {
      routesInfoDispatch({
        type: routesInfo_actions.SET_IS_Loaded,
        payload: false,
      });
      tripInfoDispatch({
        type: data.actionType,
        payload: data.destinationData,
      });
    }

    function handleReceiveRoutes(data) {
      routesInfoDispatch({
        type: data.actionType,
        payload: data.routeData,
      });
    }

    joinRoom({ room: itineraryId });
    socket.on('receive_destinations', handleReceiveDestinations);
    socket.on('receive_routes', handleReceiveRoutes);

    return () => {
      socket.off('receive_destinations', handleReceiveDestinations);
      socket.off('receive_routes', handleReceiveRoutes);
    };
  }, [itineraryId]);
}
