import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

describe('App Sanity Check', () => {
  it('renders basic React Native components without crashing', () => {
    const tree = renderer.create(<Text>NoteBack Expo</Text>).toJSON();
    expect(tree).toBeTruthy();
  });
});
