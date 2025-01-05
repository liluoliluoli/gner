declare module 'react-native-vlc-media-player' {
  import { ViewProps } from 'react-native';
  import React from 'react';

  interface VLCPlayerProps extends ViewProps {
    source: {
      uri: string;
      type?: string;
      headers?: { [key: string]: string };
    };
    autoplay?: boolean;
    resizeMode?: 'contain' | 'cover' | 'stretch';
    paused?: boolean;
    seek?: number;
    volume?: number;
    muted?: boolean;
    playInBackground?: boolean;
    rate?: number;
    onError?: (error: any) => void;
    onProgress?: (data: { currentTime: number; duration: number }) => void;
    onEnd?: () => void;
    onPlaying?: () => void;
    onPaused?: () => void;
    onBuffering?: () => void;
  }

  export default class VLCPlayer extends React.Component<VLCPlayerProps> {}
} 