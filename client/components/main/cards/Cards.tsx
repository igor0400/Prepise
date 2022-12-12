import { FC, useEffect, useState } from 'react';

const settings = [
   {
      title: 'Подготовка',
      descr: 'Вы сможете удобно подготовиться к собеседованию, на основании опыта других пользователей.',
      list: [
         'В разделе ##questions.вопросов## настройте фильтры по необходимой вам професии и тегам.',
         'Из полученных вопросов выберите наиболее подходящие и изучите пояснение автора об его опыте ответа на этот вопрос (Если вам понравиться ответ автора, вы можете отметить вопрос лайком, в обратном случае, дизлайком. Это поможет продвижению вопроса).',
         'В ##profile.профиле## добавьте новое собеседование, в разделе ##interviewes.собеседования##, и в назначенное время вам придет напоминание.',
         'Желаем вам удачи на собеседовании)',
      ],
   },
];

const Cards: FC = () => {
   const [cardsArr, setCardsArr] = useState([]);

   useEffect(() => {
      const allCards: any = [];

      settings.forEach((item) => {
         const newList: any = [];

         item.list.forEach((listItem: string) => {
            const regexp = /##[a-z]*\.[а-я]*##/gi;
            const filteredItem = listItem.split(regexp);
            const links = listItem.match(regexp);
            newList.push({
               strings: filteredItem,
               links,
            });
         });

         allCards.push({ ...item, list: newList });
      });

      setCardsArr(allCards);
      console.log(allCards);
   }, []);

   return <div className="cards">Карточки</div>;
};

export default Cards;
