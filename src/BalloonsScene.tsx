import {
  FilamentView,
  DefaultLight,
  Model,
  Camera,
  RenderCallback,
  Float3,
} from 'react-native-filament';
import BalloonModel from './balloon.glb';
import {StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-worklets-core';
import React, {useCallback} from 'react';

export default function BalloonsScene() {
  const translate = useSharedValue<Float3>([0, 0, 0]);

  const renderCallback: RenderCallback = useCallback(() => {
    'worklet';
    const newY = translate.value[1] + 0.01;
    translate.value = [0, newY, 0]; // Commenting this line will stop the app from crashing
  }, [translate]);

  return (
    <FilamentView style={styles.filamentView} renderCallback={renderCallback}>
      <DefaultLight />
      <Model source={BalloonModel} transformToUnitCube translate={translate} />
      <Camera />
    </FilamentView>
  );
}

const styles = StyleSheet.create({
  filamentView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
