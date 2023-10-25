import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Button,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImagePicker, {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import {captureRef} from 'react-native-view-shot';
import {SVG} from '../../../constants';
import ModalAvatar from '../../../components/personal/modalAvata';
import ModalPoup from '../../../components/commons/modalPoup';
import RNFetchBlob from 'rn-fetch-blob';
import useAccount from './useAccount';

export function ImagePickerAvatar({avatar, fullname, dob}: any) {
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [response, setResponse] = React.useState<any>(null);
  const options: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo' as MediaType,
    includeBase64: true,
  };

  const {UpdateProfile} = useAccount();
  const onButtonImageLibrary = React.useCallback(() => {
    launchImageLibrary(options, setResponse);
    setVisible(false);
    setShowImage(true);
  }, []);

  const viewToSnapshotRef = useRef<View | undefined>(undefined) as any;
  const [snapshotImg, setSnapshotImg] = useState(avatar);
  const [type, setType] = useState(0);

  const snapshot = async () => {
    const result = await captureRef(viewToSnapshotRef, {result: 'data-uri'});

    setSnapshotImg(result);

    console.log('dataa', result);

    const data = {
      fullname: fullname,
      dob: dob,
      avatar: result,
    };
    UpdateProfile(data);
    setVisible(false);

    setShowImage(false);
  };
  const CloseShowImage = async () => {
    setVisible(false);
    setShowImage(false);
    setResponse(null);
  };
  const openViewAVata = async () => {
    if (snapshotImg != null) {
      setVisible(false);
      setShowImage(true);
    }
    setType(0);
  };
  const openSelectAVata = async () => {
    onButtonImageLibrary();

    setType(1);
  };

  const REMOTE_IMAGE_PATH = snapshotImg;

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download photos',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;
    let ext: any = getExtention(image_URL);
    ext = '.' + (ext ? ext[0] : '');

    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        console.log('Image Downloaded Successfully.');
        setVisible(false);
        setShowImage(false);
        setVisibleSuccess(true);
      });
  };

  const getExtention = (filename: any) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.avatar}>
      {/* <SVG.Avata_future_lang style={styles.avatarImage} height={100} width={100} /> */}
      <Image
        style={styles.avatarImage}
        source={
          snapshotImg
            ? {uri: snapshotImg}
            : require('../../../assets/image/avatar1.png')
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setVisible(true)}>
        <SVG.Icon_import height={30} width={30} />
      </TouchableOpacity>
      <ModalPoup visible={visible}>
        <View style={{marginLeft: 'auto'}}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <SVG.Icon_close height={30} width={30} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => openViewAVata()}>
            <SVG.Icon_avata height={40} width={40} />
            <Text
              numberOfLines={1}
              style={{
                color: '#323232',
                fontSize: 16,
                textAlignVertical: 'center',
                paddingLeft: 12,
              }}>
              Xem ảnh đại diện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', paddingTop: 12}}
            onPress={() => openSelectAVata()}>
            <SVG.Icon_ambum height={40} width={40} />
            <Text
              numberOfLines={1}
              style={{
                color: '#323232',
                fontSize: 16,
                textAlignVertical: 'center',
                paddingLeft: 12,
              }}>
              Chọn ảnh đại diện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', paddingVertical: 12}}
            onPress={checkPermission}>
            <SVG.Icon_download height={40} width={40} />
            <Text
              numberOfLines={1}
              style={{
                color: '#323232',
                fontSize: 16,
                textAlignVertical: 'center',
                paddingLeft: 12,
              }}>
              Tải ảnh đại diện về máy
            </Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>

      <ModalAvatar visible={showImage}>
        <TouchableOpacity onPress={CloseShowImage} style={{marginLeft: 'auto'}}>
          <SVG.Icon_close_white />
        </TouchableOpacity>

        {type == 1 ? (
          response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} ref={viewToSnapshotRef}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                source={{uri: uri}}
                key={uri}
                style={{
                  width: 350,
                  height: 350,
                  alignItems: 'center',
                  borderRadius: 180,
                  position: 'absolute',
                }}
              />
              <Image
                style={{
                  width: 350,
                  height: 350,
                  alignItems: 'center',
                  borderRadius: 180,
                }}
                resizeMode="cover"
                resizeMethod="scale"
                source={require('../../../assets/image/avatar1.png')}
              />
            </View>
          ))
        ) : (
          <View>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              source={{uri: snapshotImg}}
              style={{
                width: 350,
                height: 350,
                alignItems: 'center',
                borderRadius: 180,
              }}
            />
          </View>
        )}

        <View style={{paddingTop: 12}}>
          {type == 1 ? (
            <TouchableOpacity onPress={snapshot} style={styles.buttonSave}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  paddingLeft: 10,
                }}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={checkPermission}
                style={[
                  styles.buttonSave,
                  {backgroundColor: 'white', flexDirection: 'row'},
                ]}>
                <SVG.Icon_download height={40} width={40} />
                <Text
                  style={{
                    color: '#525252',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}>
                  Tải ảnh đại diện về máy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openSelectAVata}
                style={[
                  styles.buttonSave,
                  {
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    marginTop: 12,
                  },
                ]}>
                <SVG.Icon_ambum height={40} width={40} />
                <Text
                  style={{
                    color: '#525252',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}>
                  Thay ảnh đại diện
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ModalAvatar>

      <ModalPoup visible={visibleSuccess}>
        <TouchableOpacity onPress={() => setVisibleSuccess(false)}>
          <View style={{alignItems: 'center'}}>
            <SVG.Icon_success />
          </View>

          <Text
            style={{
              marginVertical: 20,
              fontSize: 18,
              textAlign: 'center',
              color: '#323232',
            }}>
            Tải ảnh đại diện về máy thành công!!
          </Text>
        </TouchableOpacity>
      </ModalPoup>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSave: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  imageBackground: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
  },
  avatarImage: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderColor: '#ffffff',

    borderRadius: 260 / 2,
  },
  addButton: {
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
