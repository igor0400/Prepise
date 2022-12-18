import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import ShadowCard from '../../../uikit/shadowCard/ShadowCard';

type settingsType = {
   title: string;
   descr: string;
   list: string[];
};

interface newListType {
   strings: string[];
   links: { link: string; text: string }[] | null;
}

type changedSettingsType = {
   title: string;
   descr: string;
   list: newListType[];
};

const settings: settingsType[] = [
   {
      title: 'Подготовка',
      descr: 'Вы можете удобно подготовиться к собеседованию, на основании опыта других пользователей.',
      list: [
         'В разделе ##questions.вопросов## настройте фильтры по необходимой вам професии и тегам.',
         'Из полученных вопросов выберите наиболее подходящие и изучите пояснение автора об его опыте ответа на этот вопрос (Если вам понравиться ответ автора, вы можете отметить вопрос лайком, в обратном случае, дизлайком. Это поможет продвижению вопроса).',
         'В ##profile.профиле## добавьте новое собеседование, в разделе ##interviewes.собеседования##, и в назначенное время вам придет напоминание.',
         'Желаем вам удачи на собеседовании)',
      ],
   },
   {
      title: 'Обучение',
      descr: 'Вы можете создать вопрос или блок вопросов, с которым вы столкнулись на собеседовании. И помогать другим пользователям в подготовке к собеседованиям.',
      list: [
         'Перейдтие на страницу создания ##create-question.вопроса## или ##create-block.блока## вопросов.',
         'Заполните все поля и при желании прикрепите фото и файлы.',
         'Если вы создаёте блок вопросов, то вы можете добавить несколько вопросов и дать название и описание блоку.',
         'Опубликуйте вопрос или блок и при возможности отвечайте на вопросы пользователей.',
      ],
   },
   {
      title: 'Получение работы / подработки',
      descr: 'Вы можете получить работу или подработку.',
      list: [
         'Заполните личную информацию в разделе ##profile?tab=info.личная_информация## в профиле и прикрепите резюме.',
         'В разделе ##questions.вопросы## выберите “тестовые” и настройте фильтры по необходимой вам професии и тегам.',
         'Внимательно причитайте вопрос, дайте ответ и ждите одобрения от автора.',
         'В случае одобрение вам придет уведомление и откроется личная переписка с автором для обсуждения деталей.',
      ],
   },
   {
      title: 'Найм сотрудников',
      descr: 'Вы можете нанять сотрудников которые правильно ответят на составленный вами вопрос или блок вопросов.',
      list: [
         'Перейдите на страницу создания тестового ##create-test-question.вопроса## или ##create-test-block.блока_тестового_вопроса##.',
         'Подробно опишите задание и при желании прикрепите фото или файлы.',
         'После публикации теста или блока тестов, дождитесь ответа от пользователей.',
         'Если кандидат вам подходит, вы можете его одобрить. После чего у вас откроется личная переписка, где вы сможете обсудить детали сотрудничества.',
      ],
   },
];

const Cards: FC = () => {
   const [cardsArr, setCardsArr] = useState<changedSettingsType[]>([]);

   useEffect(() => {
      const allCards: changedSettingsType[] = [];

      settings.forEach((item: settingsType) => {
         const newList: newListType[] = [];

         item.list.forEach((listItem: string) => {
            const regexp = /##[^ ]+\.[^ ]+##/gi;
            const filteredItem = listItem.split(regexp);
            const links: string[] | null = listItem.match(regexp);
            const upgradedLinks = links
               ? links.map((link: string) => {
                    const slicedLink = link.replaceAll('##', '').split('.');

                    return {
                       link: slicedLink[0],
                       text: slicedLink[1].replaceAll('_', ' '),
                    };
                 })
               : null;

            newList.push({
               strings: filteredItem,
               links: upgradedLinks,
            });
         });

         allCards.push({ ...item, list: newList });
      });

      setCardsArr(allCards);
   }, []);

   return (
      <div className="cards padding-50 max-w-6xl mx-auto my-14">
         {cardsArr.map((item: changedSettingsType, i: number) => (
            <div key={i} className="my-14">
               <h2 className="text-3xl font-bold text-center pb-6">
                  {item.title}
               </h2>
               <ShadowCard type="descr">{item.descr}</ShadowCard>
               <div className="pt-5 grid grid-cols-2 gap-4">
                  {item.list.map((listItem: newListType, listItemI: number) => (
                     <ShadowCard type="list-item" key={listItemI}>
                        <span className="font-bold"> {listItemI + 1}.</span>{' '}
                        {listItem.strings.map(
                           (string: string, strI: number) => (
                              <React.Fragment key={strI}>
                                 {string}
                                 {listItem.links && listItem.links[strI] ? (
                                    <Link
                                       href={listItem.links[strI].link}
                                       className="text-blue-600"
                                    >
                                       {listItem.links[strI].text}
                                    </Link>
                                 ) : null}
                              </React.Fragment>
                           )
                        )}
                     </ShadowCard>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export default Cards;
