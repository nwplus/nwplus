import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import SignUp from './pages/SignUp';

import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../input/buttons';
import propTypesTemplates from '../../../prop-types-templates';

const getPrimaryButtonText = (activeIndex, count) => {
  if (activeIndex === count - 1) {
    return 'Submit application';
  }
  if (activeIndex === count - 2) {
    return 'One last step';
  }
  return 'Next';
};

const HackerApplication = (props) => {
  const { hackerApplication, cancelled } = props;
  if (hackerApplication.isSubmitted) return (<Redirect to="/dashboard" />);
  if (cancelled) return (<Redirect to="/" />);

  const {
    count,
    activeIndex,
    lastValidIndex,
    onPageChange,
    onPageBack,
    onPageNext,
    onHackerApplicationChange,
    cancelHackerApplication,
    isNextButtonEnabled,
    updateNextButtonState,
    submitApplication,
  } = props;

  const indexToPage = {
    0: (
      <PageOne
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        />
    ),
    1: (
      <PageTwo
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        />
    ),
    2: (
      <SignUp
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        />
    ),
  };

  const alertThenCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      cancelHackerApplication();
    }
  };

  return (
    <div className="pad-nav application fill-width flex jc-center">
      <div className="pad-ends-mega">
        <ProgressGroup
          count={count}
          activeIndex={activeIndex}
          lastValidIndex={lastValidIndex}
          onClick={onPageChange}
          className="pad-bottom-mega"
          />
        { indexToPage[activeIndex] }
        <ButtonGroup className="pad-top-mega">
          <SecondaryButton
            text={activeIndex === 0 ? 'Cancel' : 'Back'}
            onClick={activeIndex === 0 ? alertThenCancel : onPageBack}
            />
          <PrimaryButton
            disabled={!isNextButtonEnabled}
            text={getPrimaryButtonText(activeIndex, count)}
            onClick={activeIndex !== count - 1 ? onPageNext : submitApplication}
            />
        </ButtonGroup>
      </div>
    </div>
  );
};

HackerApplication.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  onHackerApplicationChange: PropTypes.func,
  cancelHackerApplication: PropTypes.func.isRequired,
  cancelled: PropTypes.bool.isRequired,
  isNextButtonEnabled: PropTypes.bool.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired
};

export default HackerApplication;
