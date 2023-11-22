//////////////////// itinerary ////////////////////

// 額外添加day?
const itinerary_data = {
  id: 1,
  holderId: 12,
  title: 'My first itinerary',
  image:
    'https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/https%3A//images.unsplash.com/photo-1699116245651-45d3cd9b7de3%3Fq%3D80%26w%3D1974%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231122%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231122T055004Z&X-Amz-Expires=3600&X-Amz-Signature=5c2f2551e790d3cc911a0302b5a091446bc28bd50361ace8577acbc6d81b1bda&X-Amz-SignedHeaders=host&x-id=GetObject',
  startTime: null,
  endTime: null,
  createdAt: '2023-11-08T07:09:55.000Z',
  updatedAt: '2023-11-08T07:09:55.000Z',
  ParticipantsUser: [
    {
      id: 12,
      name: 'user01',
      avatar:
        'https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user01%40example.com/adde46d30aacbed79335f252a63507a94e5234de66c144d982544430a1e4c425?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231122%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231122T055004Z&X-Amz-Expires=3600&X-Amz-Signature=84882a5455591898fa77d63e854abf3bce8bbd79c182e0af3939b6822dfddd79&X-Amz-SignedHeaders=host&x-id=GetObject',
    },
    {
      id: 13,
      name: 'user02',
      avatar: null,
    },
    {
      id: 14,
      name: 'user03',
      avatar: null,
    },
    {
      id: 15,
      name: 'user04',
      avatar: null,
    },
    {
      id: 16,
      name: 'user05',
      avatar: null,
    },
    {
      id: 17,
      name: 'user15',
      avatar:
        'https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user15%40example.com/47824b018785fe126c535216172ae78ee6d8debc5ca27883201a55e3e5ab26ae?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231122%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231122T055004Z&X-Amz-Expires=3600&X-Amz-Signature=8848b79f24c800aaa6119205e9bf8dcd8904de98b8d8bab42c6e0d98d838feb6&X-Amz-SignedHeaders=host&x-id=GetObject',
    },
  ],
};

//////////////////// destination ////////////////////

// 簡化
const destinations_data_v1 = [
  {
    day: 0,
    date: '2023-01-01',
    destinations: [
      // 原始後端資料
      {
        id: 1,
        itineraryId: 1,
        date: '2023-01-01T01:20:30Z',
        Place: {
          id: 11,
          name: 'IKEA 瑞典餐廳 台北城市店 小巨蛋',
          address:
            '105, Taiwan, Taipei City, Songshan District, DunHua N Rd, 100號B1',
          rating: 4.2,
          url: 'https://maps.google.com/?cid=14224084842563028856',
          lat: 25.0523,
          lng: 121.548,
          intro:
            'Contemporary space offering an international menu of IKEA classics including meatballs & ice cream.',
          image:
            'https://lh3.googleusercontent.com/places/ANXAkqHD-ZaHGzl_Vm42y5H78e_jIrNbfqKsQg9oADufnNAL2zX4gnQJgHvwyBlSUytT4ZiMfQndqUrT77soIFpG2XTvVV_wLZiVJuQ=s1600-w400',
        },
      },
      // 簡化
      {
        id: 11,
        name: 'IKEA 瑞典餐廳 台北城市店 小巨蛋',
        address:
          '105, Taiwan, Taipei City, Songshan District, DunHua N Rd, 100號B1',
        rating: 4.2,
        url: 'https://maps.google.com/?cid=14224084842563028856',
        lat: 25.0523,
        lng: 121.548,
        intro:
          'Contemporary space offering an international menu of IKEA classics including meatballs & ice cream.',
        image:
          'https://lh3.googleusercontent.com/places/ANXAkqHD-ZaHGzl_Vm42y5H78e_jIrNbfqKsQg9oADufnNAL2zX4gnQJgHvwyBlSUytT4ZiMfQndqUrT77soIFpG2XTvVV_wLZiVJuQ=s1600-w400',
      },
    ],
  },
];

// 再簡化（把date抽出來）
const destinations_data_v2 = [
  // Day 1
  [
    {
      date: '......', // 額外添加
      id: 11,
      name: 'IKEA 瑞典餐廳 台北城市店 小巨蛋',
      address:
        '105, Taiwan, Taipei City, Songshan District, DunHua N Rd, 100號B1',
      rating: 4.2,
      url: 'https://maps.google.com/?cid=14224084842563028856',
      lat: 25.0523,
      lng: 121.548,
      intro:
        'Contemporary space offering an international menu of IKEA classics including meatballs & ice cream.',
      image:
        'https://lh3.googleusercontent.com/places/ANXAkqHD-ZaHGzl_Vm42y5H78e_jIrNbfqKsQg9oADufnNAL2zX4gnQJgHvwyBlSUytT4ZiMfQndqUrT77soIFpG2XTvVV_wLZiVJuQ=s1600-w400',
    },
    {
      '...': '...',
      '...': '...',
    },
  ],
  // Day 2
  [
    {
      date: '......', // 額外添加
      id: 11,
      name: 'IKEA 瑞典餐廳 台北城市店 小巨蛋',
      address:
        '105, Taiwan, Taipei City, Songshan District, DunHua N Rd, 100號B1',
      rating: 4.2,
      url: 'https://maps.google.com/?cid=14224084842563028856',
      lat: 25.0523,
      lng: 121.548,
      intro:
        'Contemporary space offering an international menu of IKEA classics including meatballs & ice cream.',
      image:
        'https://lh3.googleusercontent.com/places/ANXAkqHD-ZaHGzl_Vm42y5H78e_jIrNbfqKsQg9oADufnNAL2zX4gnQJgHvwyBlSUytT4ZiMfQndqUrT77soIFpG2XTvVV_wLZiVJuQ=s1600-w400',
    },
    {
      '...': '...',
      '...': '...',
    },
  ],
];

//////////////////// distances ////////////////////
