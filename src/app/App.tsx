import { AppRouter } from "../common/components/AppRouter/AppRouter";
import { Header } from "../common/components/Header/Header";
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { InitAppTC } from "./appThunks";
import { useAllSelector, useAppDispatch } from "../common/hooks";
import { appStateSelect } from "./selectors";
import { Preloader } from "../common/components/Preloader/Preloader";
import { Notifications } from "../common/components/Notifications/Notifications";
import {Container} from "@mui/material";

function App() {
  const { isInit } = useAllSelector(appStateSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(InitAppTC());
  }, []);

  return isInit ? (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.page}>
         <Container maxWidth='lg'>
            <AppRouter />
         </Container>
        <Notifications />
      </main>
    </div>
  ) : (
    <Preloader />
  );
}
export default App;
