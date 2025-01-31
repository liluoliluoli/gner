import * as React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {VLCPlayer} from 'react-native-vlc-media-player';
import * as ScreenOrientation from 'expo-screen-orientation';


type Params = {
    videoId: string;
};

export default function PlayerScreen() {
    const {videoId} = useLocalSearchParams<Params>();
    const [videoUrl, setVideoUrl] = React.useState('');

    React.useEffect(() => {
        // 设置横屏
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        // 获取视频URL
        fetchVideoUrl();

        return () => {
            // 恢复竖屏
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, [videoId]);

    const fetchVideoUrl = async () => {
        try {
            const response = await fetch(`YOUR_API_BASE_URL/videos/${videoId}`);
            const data = await response.json();
            setVideoUrl(data.url);
        } catch (error) {
            console.error('Error fetching video URL:', error);
        }
    };

    if (!videoUrl) {
        return null;
    }

    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' ? (
                <VLCPlayer
                    style={styles.player}
                    source={{uri: videoUrl}}
                    autoplay={true}
                    resizeMode="contain"
                />
            ) : (
                <video
                    style={styles.player}
                    src={videoUrl}
                    autoPlay
                    controls
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    player: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
