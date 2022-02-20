# rtngs

### Backend
I choose **Python** [Flask](https://flask.palletsprojects.com/en/2.0.x/) to run the backbone of this app because it's light, can be run with very minimal boilerplate code and sufficient enough to satisfy the requirements.

### Frontend
I use [Parcel](https://parceljs.org/) to setup and bundle **HTML**, **CSS** and **Vanilla JS** stack for the MVP step because it's also a great bundler for **React.js**, it make us can easily [migrate html + native js to React.js](https://parceljs.org/recipes/react/) to satisfy the second step, V2.

### Real-Time
I bet on [Socket.IO](https://socket.io/) to make the display of the rating real-time.

### Continuous Deployment
I setup a small automated deployment using [github action](https://github.com/features/actions) to make development-deployment experience better.

***

### Reflection
* With more data inserted, we need to start considering a paginating system, data need to be queried in chunks to achieve a better UX.
* For better data serving, i would also consider using library like [React Query](https://react-query.tanstack.com/) or [SWR](https://swr.vercel.app/) to handle fetching, caching and revalidating data.

