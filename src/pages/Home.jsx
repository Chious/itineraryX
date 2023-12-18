import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, EffectFade, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vw 0
`

const Myswiper = styled.div`
  width: 100%;
  margin: 3vw 0;
`

const Slideimg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw
`

const StyledImg = styled.img`
  width: 100%;
  height: 50vw;
  object-fit: cover;
  border-radius: 1vw
`

const Title = styled.div`
  display: flex;
  width: 100%;
`

const Destination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DestinationList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap:1vw;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
`

const DestinationCard = styled.img`
  width: 100%;
  height: 15vw;
  object-fit: cover;
  border-radius: 1vw
`

const Itinerary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ItineraryList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap:2vw;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
`

const ItineraryCard = styled.img`
  width: 100%;
  height: 15vw;
  object-fit: cover;
  border-radius: 1vw
`

const TeamIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  return (
    <>
      <PrimarySearchAppBar>
        <Container>
          <Content>
            <Title>
              <p style={{fontSize:'5vw'}}>Your travel planning friend.</p>
            </Title>
            <Myswiper>
              <Swiper
                modules={[Navigation, EffectFade, Autoplay]}
                navigation
                effect={'fade'}
                speed={800}
                slidesPerView={1}
                loop
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
                  <Slideimg>
                    <StyledImg src="/src/images/spot/California-1.jpeg" />
                  </Slideimg>
                </SwiperSlide>
                <SwiperSlide>
                  <Slideimg>
                    <StyledImg src="/src/images/spot/Sydney.jpeg" />
                  </Slideimg>
                </SwiperSlide>
                <SwiperSlide>
                  <Slideimg>
                    <StyledImg src="/src/images/spot/HongKong.jpeg" />
                  </Slideimg>
                </SwiperSlide>
                <SwiperSlide>
                  <Slideimg>
                    <StyledImg src="/src/images/spot/Okinawa.jpeg" />
                  </Slideimg>
                </SwiperSlide>
              </Swiper>
            </Myswiper>
            <Destination>
              <p style={{fontSize:'3vw'}}>Popular Destination</p>
              <DestinationList>
                <DestinationCard src="/src/images/spot/Kyoto.jpeg"/>
                <DestinationCard src="/src/images/spot/Tokyo-1.jpeg"/>
                <DestinationCard src="/src/images/spot/Osaka.jpeg"/>
                <DestinationCard src="/src/images/spot/Seoul.jpeg"/>
                <DestinationCard src="/src/images/spot/Bangkok.webp"/>
              </DestinationList>
            </Destination>
            <Itinerary>
              <p style={{fontSize:'3vw', alignSelf: 'flex-start'}}>Recommended Itinerary</p>
              <ItineraryList>
                <ItineraryCard src="/src/images/spot/Bangkok.webp">
                </ItineraryCard>
                <ItineraryCard src="/src/images/spot/Bangkok.webp"/>
                <ItineraryCard src="/src/images/spot/Bangkok.webp"/>
                <ItineraryCard src="/src/images/spot/Bangkok.webp"/>
              </ItineraryList>
            </Itinerary>
            <TeamIntro>
              <p style={{fontSize:'3vw'}}>Our Team</p>
            </TeamIntro>
          </Content>
        </Container>
      </PrimarySearchAppBar>
    </>
  )
}