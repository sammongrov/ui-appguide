import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ Layout, slides, onDone, onSkip }) => (
  <Layout slides={slides} onDone={() => onDone()} onSkip={() => onSkip()} />
);

Intro.propTypes = {
  Layout: PropTypes.func.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

Intro.defaultProps = {};

export default Intro;
