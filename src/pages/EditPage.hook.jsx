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

export function useFetchDataAndCheckAuth() {
  const { itineraryId } = useParams();
  const tripInfoDispatch = useTripInfoDispatch();
  const authDispatch = useAuthDispatch();
  const routesInfoDispatch = useRoutesInfoDispatch();
  const destinations = useTripInfo().destinations;

  useEffect(() => {
    // 取得指定行程的資料
    const fetchItinerary = async () => {
      const data = await getItinerary(itineraryId);
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

    // 檢查使用者是否有編輯權限
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

    // 取得指定行程中的所有景點
    const fetchDestinations = async (itinerary_data) => {
      const itineraryId = itinerary_data.itineraryId;
      const totalDays = itinerary_data.totalDays;
      const startDate = moment(itinerary_data.startTime.split('T')[0]);
      const destinations_data = [];
      // 取得所有天數的景點
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
      auth(itinerary_data);
      fetchDestinations(itinerary_data);
    });
  }, []);

  useEffect(() => {
    // 產生placePairs起終點陣列
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

    // 產生routes交通路線資訊陣列
    const fetchRoutes = async (destinations) => {
      if (destinations.length === 0) return;
      const placePairs = genPlacePairs(destinations);
      const newRoutes = [];
      for (let day = 0; day < placePairs.length; day++) {
        newRoutes.push([]);
        for (let order = 0; order < placePairs[day].length; order++) {
          // const itineraryId = itinerary.itineraryId;
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
