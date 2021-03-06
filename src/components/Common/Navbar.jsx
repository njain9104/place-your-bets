import React, { useState, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { Loading } from '.';
import { ROUTE_CONSTANTS } from '../../constants';
import Backdrop from './Backdrop';
import Button from './Button';

const PlayInstructions = lazy(() => import('./PlayInstructions'));

const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);

  const history = useHistory();

  const onButtonClick = () => history.push(ROUTE_CONSTANTS.ROOT);

  const onHelpClick = () => setShowHelp(true);

  const onCloseInstructions = () => setShowHelp(false);

  const onBackdropClick = () => setShowHelp(false);

  return (
    <div className="navbar">
      <Button buttonText="Home" onButtonClick={onButtonClick} />
      <Button buttonText="how to play" onButtonClick={onHelpClick} />
      <Backdrop showBackdrop={showHelp} onBackdropClick={onBackdropClick}>
        <Suspense fallback={<Loading />}>
          <PlayInstructions onCloseInstructions={onCloseInstructions} />
        </Suspense>
      </Backdrop>
    </div>
  );
};

export default Navbar;
