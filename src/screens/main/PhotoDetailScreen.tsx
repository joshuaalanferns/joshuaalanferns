/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';
import {height, width} from '../../utility/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import ImageOnprofile from '../../components/ImageOnprofile';

interface Props {
  name: string;
  profileimage: string;
  discription: string;
  photoData: string;
  views: string;
}
const API_URL = 'https://api.unsplash.com';
const CLIENT_ID = 'v-ECypcMxbcmWmFZ0fBuztx81V9fR4yZH4dIBECPrno';

const PhotoDetailScreen: React.FC<Props> = () => {
  const route = useRoute();
  const {discription} = route.params;
  const [username, setusername] = useState<string>();
  const url = `${API_URL}/photos/${discription}?client_id=${CLIENT_ID}`;
  const profileurl = `${API_URL}/users/${username}/photos?client_id=${CLIENT_ID}`;

  const [photoData, setPhotoData] = useState<string>();
  const [userdata, setuserdata] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [serachvalue, setserachvalue] = useState<string>();
  const [changetext, setchangetext] = useState<string>('');

  const numColumns = 5;
  const imageWidth = Dimensions.get('window').width / numColumns;
  const imageHeight = imageWidth * 1.5;
  const imageMargin = 5;
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setIsLoading(false);
        // console.log(data?.user?.username);
        setusername(data?.user?.username);
        setPhotoData(data);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(username);
    fetch(profileurl, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        setuserdata(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [photoData]);
  const renderItem = ({item, index}: {item: Photo; index: number}) => {
    return (
      <View style={styles.photoContainer}>
        <FastImage
          style={styles.photo}
          source={{
            uri: item?.urls?.regular,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        placeholder={'Search image'}
        onChangeText={setchangetext}
        value={serachvalue}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <FastImage
            style={styles.profile}
            source={{
              uri: photoData?.user?.profile_image?.medium,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.title}>{photoData?.user?.name}</Text>
        </View>
        <View style={styles.belowcontainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                borderColor: 'grey',
              }}>
              <Ionicons
                name="heart-sharp"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 10,
                borderColor: 'grey',
              }}>
              <Ionicons name="add" size={24} color="grey" style={styles.icon} />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <Text style={styles.text1}>Download</Text>
            <View
              style={{
                padding: 6,
                borderRightWidth: 0.5,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                alignItems: 'center',
                borderColor: 'grey',
              }}>
              <Ionicons
                name="chevron-down-outline"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
          </View>
        </View>
        <ImageOnprofile
          imageSource={photoData?.urls?.regular}
          discription={photoData?.id}
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center', marginLeft: 15}}>
            <Text style={styles.text}>Views</Text>
            <Text style={styles.text}>{photoData?.views}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 10,
                borderColor: 'grey',
              }}>
              <Ionicons
                name="share-social"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 10,
                borderColor: 'grey',
              }}>
              <Ionicons
                name="md-alert-circle"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
            <View
              style={{
                padding: 6,
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: 'center',
                marginLeft: 10,
                borderColor: 'grey',
              }}>
              <Ionicons
                name="md-ellipsis-horizontal-sharp"
                size={24}
                color="grey"
                style={styles.icon}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          <Text style={styles.title2}>Related photos</Text>
          <FlatList
            data={userdata}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.container}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title2}>Related Collection</Text>
        </View>
        <View style={{flex: 1, margin: 10}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <FastImage
              style={{
                width: width / 1.8 - 10,
                height: (Dimensions.get('window').width / 3 - 10) * 2,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
              source={{
                uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw0Nnx8dHJhdmVsfGVufDB8fHx8MTY3NzQ0MzYzNQ&ixlib=rb-4.0.3&q=80&w=1080',
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <FastImage
                style={{
                  borderTopRightRadius: 8,
                  marginLeft: 5,
                  width: width / 2.3 - 10,
                  height: (Dimensions.get('window').width / 3 - 10) * 1,
                }}
                source={{
                  uri: 'https://images.unsplash.com/photo-1497262693247-aa258f96c4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw0OXx8dHJhdmVsfGVufDB8fHx8MTY3NzQ0MzYzNQ&ixlib=rb-4.0.3&q=80&w=1080',
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <FastImage
                style={{
                  borderBottomRightRadius: 8,
                  marginLeft: 5,
                  width: width / 2.3 - 10,
                  height: (Dimensions.get('window').width / 3 - 10) * 1,
                }}
                source={{
                  uri: 'https://images.unsplash.com/photo-1430965914765-930206c18c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw1Nnx8d2FsbHBhcGVyc3xlbnwwfHx8fDE2Nzc0MTIwMjE&ixlib=rb-4.0.3&q=80&w=1080',
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
              }}>
              Collection #82: Jared Erondu
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'grey',
              }}>
              9 photos · Curated by Jared Erondu
            </Text>
          </View>
        </View>

        <View style={{flex: 1, margin: 10, marginTop: 20, marginBottom: 40}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <FastImage
              style={{
                width: width / 1.8 - 10,
                height: (Dimensions.get('window').width / 3 - 10) * 2,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
              source={{
                uri: 'https://images.unsplash.com/photo-1548081087-a8a3bc4ff088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw0Nnx8YXJ0fGVufDB8fHx8MTY3NzQ0MzgxOA&ixlib=rb-4.0.3&q=80&w=1080',
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <FastImage
                style={{
                  borderTopRightRadius: 8,
                  marginLeft: 5,
                  width: width / 2.3 - 10,
                  height: (Dimensions.get('window').width / 3 - 10) * 1,
                }}
                source={{
                  uri: 'https://images.unsplash.com/photo-1548811579-017cf2a4268b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw0OHx8YXJ0fGVufDB8fHx8MTY3NzQ0MzgxOA&ixlib=rb-4.0.3&q=80&w=1080',
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <FastImage
                style={{
                  borderBottomRightRadius: 8,
                  marginLeft: 5,
                  width: width / 2.3 - 10,
                  height: (Dimensions.get('window').width / 3 - 10) * 1,
                }}
                source={{
                  uri: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTUwODR8MHwxfHNlYXJjaHw1N3x8YXJ0fGVufDB8fHx8MTY3NzQ0MzgxOA&ixlib=rb-4.0.3&q=80&w=1080',
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
              }}>
              Abstract and Textures
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'grey',
              }}>
              240 photos · Curated by Katie Sweetman
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    // flexDirection: 'row',
    //     flexWrap: 'wrap'
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  belowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  photoContainer: {
    margin: 5,
  },
  photo: {
    width: Dimensions.get('window').width / 2 - 20,
    height: (Dimensions.get('window').width / 3 - 10) * 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
    marginLeft: 15,
  },
  title2: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginLeft: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 0.5,
    padding: 8,
    borderColor: 'grey',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
  },
});

export default PhotoDetailScreen;
