import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { View, Text } from 'react-native';

import Intro from '../Intro';

const onDone = jest.fn();
const onSkip = jest.fn();

const Layout = ({ slides, onDone, onSkip }) => (
  <View>
    {slides.map((slide, index) => (
      <Text key={index} onPress={onSkip} onLongPress={onDone}>
        {slide.name}
      </Text>
    ))}
  </View>
);

const slides = [{ name: 'slide1' }, { name: 'slide2' }, { name: 'slide999' }];
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('appGuide renders correctly', () => {
  beforeEach(() => {
    onDone.mockClear();
  });

  it('with appGuide.viewed === false', () => {
    const initialState = {
      appGuide: {
        viewed: false,
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Intro Layout={Layout} slides={slides} onDone={onDone} onSkip={onSkip} store={store} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(onDone.mock.calls.length).toBe(0);
  });

  it('with appGuide.viewed === true', () => {
    const initialState = {
      appGuide: {
        viewed: true,
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Intro Layout={Layout} slides={slides} onDone={onDone} onSkip={onSkip} store={store} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(onDone.mock.calls.length).toBe(1);
    expect(onDone.mock.calls[0][0]).toBeUndefined();
  });

  it('with appGuide has no viewed property', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Intro Layout={Layout} slides={slides} onDone={onDone} onSkip={onSkip} store={store} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(onDone.mock.calls.length).toBe(0);
  });
});

describe('appGuide dispatches onViewedIntro', () => {
  const initialState = {
    appGuide: {
      viewed: false,
    },
  };
  const store = mockStore(initialState);
  const component = renderer.create(
    <Intro Layout={Layout} slides={slides} onDone={onDone} onSkip={onSkip} store={store} />,
  ).root;

  beforeEach(() => {
    store.clearActions();
  });

  it('from onSkip prop', async () => {
    onSkip.mockClear();
    await component.findAllByType(Text)[0].props.onPress();

    expect(store.getActions()).toMatchSnapshot();
    expect(onSkip.mock.calls.length).toBe(1);
    expect(onSkip.mock.calls[0][0]).toBeUndefined();
  });

  it('from onDone prop', async () => {
    onDone.mockClear();
    await component.findAllByType(Text)[1].props.onLongPress();

    expect(store.getActions()).toMatchSnapshot();
    expect(onDone.mock.calls.length).toBe(1);
    expect(onDone.mock.calls[0][0]).toBeUndefined();
  });
});
