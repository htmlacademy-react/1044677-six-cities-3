import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
  return (
    <MainScreen offersCount={offersCount}/>
  );
}

export default App;
