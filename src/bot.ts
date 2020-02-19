import Twit, { Response } from 'twit';

const Twitter = new Twit(require('./config'));

const mediaArtsSearch: Twit.Params = {
  q: '#100DaysOfCode',
  count: 100,
  // eslint-disable-next-line @typescript-eslint/camelcase
  result_type: 'recent',
};

const retweetLatest = () => {
  Twitter.get('search/tweets', mediaArtsSearch, (error: Error, data: any) => {
    console.log(error, data);
    if (!error) {
      const retweetId = data.statuses[0].id_str;
      Twitter.post(
        'statuses/retweet/' + retweetId,
        {},
        (error: Error, response: Response) => {
          if (response) {
            console.log(
              'Success! Check your bot, it should have retweeted something.',
            );
          }
          if (error) {
            console.log('There was an error with Twitter:', error);
          }
        },
      );
    } else {
      console.log('There was an error with your hashtag search:', error);
    }
  });
};

retweetLatest();
setInterval(retweetLatest, 1000 * 20);
