/* eslint-env node, jest */
import 'react-native';
import React from 'react';
import CloseBtn from '../CloseBtn';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CloseBtn onPress={ () => null } />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with a color passed in', () => {
  const tree = renderer.create(
    <CloseBtn color='#000000' onPress={ () => null } />
  ).toJSON();

  expect(tree.children[0].props.style.tintColor).toBe('#000000');
});

it('renders correctly with no color passed in', () => {
  const tree = renderer.create(
    <CloseBtn onPress={ () => null } />
  ).toJSON();

  expect(tree.children[0].props.style.tintColor).toBe('#ffffff');
});
