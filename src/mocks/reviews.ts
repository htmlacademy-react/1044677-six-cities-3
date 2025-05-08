import { Reviews } from '../types/review';

export const reviews: Reviews = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatar: 'img/avatar-max.jpg'
    },
    rating: 80,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24'
  },
  {
    id: '2',
    user: {
      name: 'Инна',
      avatar: 'img/avatar-angelina.jpg'
    },
    rating: 100,
    comment: 'Думаю, что это место прекрасно подойдет для отдыха и здесь отличным видом!',
    date: '2019-05-10'
  },
  {
    id: '3',
    user: {
      name: 'Иван',
      avatar: 'img/avatar-max.jpg'
    },
    rating: 60,
    comment: 'У этого места прекрасное расположение',
    date: '2019-06-18'
  }
];
