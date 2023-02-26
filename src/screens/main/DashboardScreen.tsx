/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import MainPOSTimagecar from '../../components/MainPOSTimagecar';
import MainScreenImge from '../../components/MainScreenImge';
import {
  saveData,
  clearData,
  setIsLoading,
  setSelectedCategory,
  setPage,
} from '../../components/Redux/Reducers';
import {height, width} from '../../utility/Dimensions';
import {categories} from '../../utility/dummyData';
import {debounce} from 'lodash';
import SecondImage from '../../components/SceondImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.unsplash.com/';
const CLIENT_ID = 'v-ECypcMxbcmWmFZ0fBuztx81V9fR4yZH4dIBECPrno';

interface Post {
  id: number;
  categories: string;
  body: string;
}

const DashboardScreen: FC = () => {
  const dispatch = useDispatch();
  const dataValue = useSelector((state: RootState) => state.data.data);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const selectedCategory = useSelector(
    (state: RootState) => state.data.selectedCategory,
  );
  const page = useSelector((state: RootState) => state.data.page);

  const [serachvalue, setserachvalue] = useState<string>();
  const [changetext, setchangetext] = useState<string>('');
  const [userdata, setuserdata] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(dataValue);
  console.log(isLoading, 'loading');
  console.log(selectedCategory);
  const fetchPosts = async () => {
    dispatch(setIsLoading(true));
    try {
      console.log(selectedCategory, 'inside try');
      const response = await fetch(
        `${API_URL}/search/photos?query=${selectedCategory}&per_page=20&page=3&client_id=${CLIENT_ID}`,
        // https://api.unsplash.com/search/photos?query=wallpapers&per_page=20&page=3&client_id=v-ECypcMxbcmWmFZ0fBuztx81V9fR4yZH4dIBECPrno
      );
      const data = await response.json();
      let post = data.results;

      if (response) {
        dispatch(saveData(post));
        // setPosts([...posts, ...post]);
        // dispatch(setPage(page + 1));
        dispatch(setIsLoading(false));
        // console.log(data);
        console.log(page);
      }
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
    }
  };
  // const handleEndReached = debounce() => {
  //   console.log('on end reach');
  //   if (!isLoading) {
  //     fetchPosts();
  //   }
  // };
  const handleEndReached = debounce(() => {
    if (!isLoading) {
      fetchPosts();
    }
  }, 1000); // adjust the delay time as needed
  const handleCategoryPress = (categoryId: string) => {
    try {
      dispatch(clearData());
      dispatch(setPage(1));
      dispatch(setSelectedCategory(categoryId));
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      fetchPosts();
    }
  }, [selectedCategory]);

  async function getUserData() {
    try {
      const UserData = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(UserData);
      console.log('User data retrieved successfully:', userData);
      if (UserData) {
        setuserdata(true);
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  const handlePress = () => {
    Linking.openURL('https://unsplash.typeform.com/unsplash-census');
  };
  const UnsplashCensus = () => {
    return (
      <TouchableOpacity style={styles.containerblack} onPress={handlePress}>
        <Text style={styles.textblack}>Unsplash Census 2023{'\n'}</Text>
        <Text
          adjustsFontSizeToFit
          style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          Help us make Unsplash better for you❤️{'\n'}
          Learn more
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}: {item: Post}) => (
    <MainPOSTimagecar
      imageSource={item?.urls?.regular}
      name={item?.user?.name}
      liked_by_user={item?.liked_by_user}
      profileimage={item?.user?.profile_image?.medium}
      description={item.id}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header
        placeholder={'Search image'}
        onChangeText={setchangetext}
        value={serachvalue}
        userdata={userdata}
      />
      <ScrollView
        horizontal={true}
        style={{maxHeight: 60}}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.Categorycontainer,
              selectedCategory === category.id &&
                styles.selectedCategoryContainer,
            ]}
            onPress={() => handleCategoryPress(category.id)}>
            <Text
              style={[
                styles.CategoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}>
              {category.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={dataValue}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => handleEndReached()}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={'grey'}
              style={{marginBottom: height * 0.025}}
            />
          ) : null
        }
        ListHeaderComponent={
          <>
            {selectedCategory === 'wallpapers' ? (
              <>
                <MainScreenImge />
                <UnsplashCensus />
              </>
            ) : (
              <SecondImage category={selectedCategory} />
            )}
          </>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: width,
    height: height,
  },
  CategoryText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
    padding: 5,
  },
  Categorycontainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    paddingBottom: 5,
    margin: 10,
  },
  selectedCategoryContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  containerblack: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width - 20,
    alignSelf: 'center',
  },
  textblack: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});
export default DashboardScreen;
