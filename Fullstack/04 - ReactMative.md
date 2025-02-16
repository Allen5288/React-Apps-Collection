# 1. Basic Concept

## 1.1 What is Ract native?

**React Native** is a framework for building mobile applications using **JavaScript** and **React**. It allows developers to write code that runs natively on both **iOS** and **Android** devices while sharing most of the codebase. React Native works by using native components (like buttons, text fields, etc.) instead of web components, giving it a performance advantage over hybrid apps that rely on webviews.

Here are some key features of React Native:

1. **Cross-Platform Development**: You can write a single codebase that works for both iOS and Android, which helps save development time and effort.
  
2. **Native Performance**: React Native uses native components, so the performance of apps is closer to that of apps built with native development languages (Swift/Objective-C for iOS, Java/Kotlin for Android).

3. **Hot Reloading**: React Native supports hot reloading, which allows you to immediately see the results of changes you make to the code without restarting the app.

4. **Rich Ecosystem**: React Native has a large library of pre-built components and third-party libraries, which can speed up the development process.

5. **Live and Hot Reloading**: Helps speed up the development process by allowing you to instantly see changes in your app without recompiling.

6. **Access to Native Features**: You can access platform-specific APIs like GPS, camera, sensors, etc., using **Native Modules** or third-party libraries.

React Native is popular for developing apps where performance is important but time and resource constraints make native development for each platform impractical. Examples of apps built with React Native include **Facebook**, **Instagram**, and **Airbnb**.

## 1.2 Getting Start with React Native Project

### 1.2.1 **Create a new project**

*Expo CLI*
```bash
npm install -g expo-cli
expo init YourProjectName
cd YourProjectName
expo start
```

*React Native CLI*
```bash
npm install -g react-native-cli
npx react-native init YourProjectName
cd YourProjectName
npm install
npx react-native run-android
npx react-native start
```

### 1.2.2 **Work with Expo Go on your phone**

1. Install Expo Go on your phone.
2. Create and navigate to your Expo project.
3. Run expo start to start the development server.
4. Open Expo Go on your phone and scan the QR code shown in your terminal or browser.
5. View and interact with your app live on your device.

### 1.2.3 Work with Android Studio and Xcode

1. Install these two apps
2. Andriod Studio: Mode actions - virtual device - create device - choose version - play buttopn to lunch the simulator
3. VScode: terminal run code - a find the emulator - it will auto start from the sudio or xode simualtor

# 2. React Native Basic

## 2.1 Commonly used React Native components

Here's a list of commonly used React Native components:

### 1. **View**
   - **Introduction**: A container component for building UI layouts in React Native.
   - **Example**:
     ```jsx
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Text>Welcome to React Native</Text>
     </View>
     ```

### 2. **Text**
   - **Introduction**: Displays text content in the app.
   - **Example**:
     ```jsx
     <Text style={{ fontSize: 20 }}>Hello, React Native!</Text>
     ```

### 3. **Image**
   - **Introduction**: Used to display images in the app.
   - **Example**:
     ```jsx
     <Image source={{ uri: 'https://example.com/image.png' }} style={{ width: 100, height: 100 }} />
     ```

### 4. **Button**
   - **Introduction**: A clickable button element used for user interactions.
   - **Example**:
     ```jsx
     <Button title="Click Me" onPress={() => alert('Button pressed!')} />
     ```

### 5. **TextInput**
   - **Introduction**: A component for handling user input through text fields.
   - **Example**:
     ```jsx
     <TextInput placeholder="Enter your name" style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
     ```

### 6. **ScrollView**
   - **Introduction**: A scrolling container that enables the app to display large content.
   - **Example**:
     ```jsx
     <ScrollView>
       <Text>Long content goes here</Text>
     </ScrollView>
     ```

### 7. **FlatList**
   - **Introduction**: A performant component for rendering large lists of data.
   - **Example**:
     ```jsx
     <FlatList
       data={[{ key: 'Devin' }, { key: 'Dan' }]}
       renderItem={({ item }) => <Text>{item.key}</Text>}
     />
     ```

### 8. **SectionList**
   - **Introduction**: A component to render sections of data, useful for grouped lists.
   - **Example**:
     ```jsx
     <SectionList
       sections={[{ title: 'D', data: ['Devin', 'Dan'] }]}
       renderItem={({ item }) => <Text>{item}</Text>}
       renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
     />
     ```

### 9. **TouchableOpacity**
   - **Introduction**: A wrapper for making elements touchable with reduced opacity when pressed.
   - **Example**:
     ```jsx
     <TouchableOpacity onPress={() => alert('Pressed')}>
       <Text>Press me</Text>
     </TouchableOpacity>
     ```

### 10. **TouchableWithoutFeedback**
   - **Introduction**: Used for handling touch events without any visual feedback.
   - **Example**:
     ```jsx
     <TouchableWithoutFeedback onPress={() => console.log('Tapped')}>
       <View style={{ padding: 10 }}>
         <Text>Click here</Text>
       </View>
     </TouchableWithoutFeedback>
     ```

### 11. **ActivityIndicator**
   - **Introduction**: A spinner or loading indicator used to show loading states.
   - **Example**:
     ```jsx
     <ActivityIndicator size="large" color="#0000ff" />
     ```

### 12. **Modal**
   - **Introduction**: A component to display content in a modal dialog.
   - **Example**:
     ```jsx
     <Modal visible={true}>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>This is a modal</Text>
       </View>
     </Modal>
     ```

### 13. **Picker**
   - **Introduction**: A dropdown-style component for selecting options from a list.
   - **Example**:
     ```jsx
     <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
       <Picker.Item label="JavaScript" value="js" />
       <Picker.Item label="Python" value="python" />
     </Picker>
     ```

### 14. **Switch**
   - **Introduction**: A toggle switch for boolean state values (like on/off).
   - **Example**:
     ```jsx
     <Switch value={isEnabled} onValueChange={(value) => setIsEnabled(value)} />
     ```

### 15. **RefreshControl**
   - **Introduction**: A component used for pull-to-refresh functionality in scrollable views.
   - **Example**:
     ```jsx
     <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
       <Text>Content to be refreshed</Text>
     </ScrollView>
     ```

### 16. **SafeAreaView**
   - **Introduction**: Ensures that content is rendered within the safe area boundaries of the device.
   - **Example**:
     ```jsx
     <SafeAreaView>
       <Text>This is inside the safe area</Text>
     </SafeAreaView>
     ```

### 17. **KeyboardAvoidingView**
   - **Introduction**: Automatically adjusts view position to ensure input fields are not hidden by the keyboard.
   - **Example**:
     ```jsx
     <KeyboardAvoidingView behavior="padding">
       <TextInput placeholder="Enter text" />
     </KeyboardAvoidingView>
     ```

### 18. **Slider**
   - **Introduction**: A component for selecting a value from a range using a sliding control.
   - **Example**:
     ```jsx
     <Slider minimumValue={0} maximumValue={100} value={value} onValueChange={(value) => setValue(value)} />
     ```

### 19. **ImageBackground**
   - **Introduction**: A component that allows you to display an image as a background.
   - **Example**:
     ```jsx
     <ImageBackground source={{uri: 'https://example.com/background.jpg'}} style={{ flex: 1 }}>
       <Text>Content on top of background</Text>
     </ImageBackground>
     ```

### 20. **StatusBar**
   - **Introduction**: Controls the appearance of the system status bar.
   - **Example**:
     ```jsx
     <StatusBar barStyle="dark-content" />
     ```

---


Olease note tere is no CSS, using **inline styles**, **stleSheet object**; written in JS;

## 2.2 Using the component to build page

Default the view can not scroll, you need to use **ScrollView**, it will render all list even in the view sight.Other wise, use **FlatList** to lazy load unshown items.

```js
<View style={styles.goalsContainer}>
    <FlatList
        data={courseGoals}
        renderItem={(itemData) => {
        return (
            <View style={styles.goalItem}>
            <Text style={styles.goalText}>{itemData.item.text}</Text>
            </View>
        );
        }}
        keyExtractor={(item, index) => {
        return item.id;
        }}
        alwaysBounceVertical={false}
    />
</View>
```
- use **Modal** directly in native
- require to import image with Image
- Add background color in app.json can apply to all page
- using **LinearGradient** to add gradient
- using **ImageBackgound** tp add imgage as background
- Using **SafeAreaView** to make safe loopup with different phone, leave space for margin
- Using **FlatList** to show the liost with scrolling
- Using **useLayoutEffect** to handlethe change of effect smoonthly

Others:
- Cascading style
- the usage of bind();

# 3. Debug React Native

`npm install -g react-deavtools`

debug JS remotely(cmd D, or tab m on console)


# **4. Responsive Design in React Native**

Responsive design ensures that your app looks great on a variety of devices with different screen sizes and orientations. React Native provides several techniques and APIs to help create a responsive layout. Here's how to implement various strategies:

---

## **4.1. Set Dynamic Width, Height, Border, and Other Styles**

In React Native, you can use percentage-based values or units like `vw`, `vh`, and `flex` to set dynamic widths, heights, borders, and other styles based on the screen size.

- **Example 1: Using Flexbox**: Flexbox is the most common approach for responsive layout.
  
  ```jsx
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18 }}>Responsive Text</Text>
  </View>
  ```

- **Example 2: Using Percentage Values for Width and Height**:
  You can use `width: '50%'` or `height: '30%'` for dynamic scaling.

  ```jsx
  <View style={{ width: '80%', height: '40%', backgroundColor: 'lightblue' }}>
    <Text style={{ textAlign: 'center', padding: 10 }}>Dynamic Width and Height</Text>
  </View>
  ```

- **Example 3: Using `rem` and `em`-like Units**: Use `PixelRatio` or `Dimensions` API to scale text or other elements dynamically.

  ```jsx
  import { PixelRatio } from 'react-native';

  const scale = PixelRatio.get();
  const dynamicFontSize = scale * 16; // Dynamically scale the font size
  
  <Text style={{ fontSize: dynamicFontSize }}>Dynamic Font Size</Text>
  ```

---

## **4.2. Using Dimensions API to Dynamically Adjust Layout**

The `Dimensions` API allows you to get the device's screen width and height and dynamically adjust styles based on the device's screen size.

### **Using Dimensions API**:
```javascript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get the screen's width and height

const dynamicStyles = {
  width: width * 0.8, // 80% of the screen width
  height: height * 0.3, // 30% of the screen height
};

return (
  <View style={[styles.container, dynamicStyles]}>
    <Text>Responsive Layout with Dimensions</Text>
  </View>
);
```

- **Note**: `Dimensions.get('window')` gives you the width and height of the entire window. You can use it to dynamically adjust layouts based on the device’s size.

- **Example of Dynamic Border Radius Based on Width**:
  ```javascript
  const dynamicRadius = width * 0.1; // 10% of the screen width
  return (
    <View style={{ borderRadius: dynamicRadius, backgroundColor: 'skyblue', width: '80%' }}>
      <Text>Dynamic Border Radius</Text>
    </View>
  );
  ```

---

## **4.3. Screen Orientation (Portrait and Landscape)**

You can dynamically adjust your layout based on the orientation (portrait or landscape) of the device using the **Screen Orientation** API in React Native.

- **Using `Dimensions` for Orientation**:
  You can check the orientation of the screen using the width and height values returned by `Dimensions`. 

  ```javascript
  import { Dimensions, View, Text } from 'react-native';

  const { width, height } = Dimensions.get('window');
  const isPortrait = height > width; // Check if device is in portrait mode

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isPortrait ? (
        <Text>Portrait Mode</Text>
      ) : (
        <Text>Landscape Mode</Text>
      )}
    </View>
  );
  ```

- **Using `useWindowDimensions` Hook**:
  React Native provides the `useWindowDimensions` hook to automatically update the screen dimensions on orientation change.

  ```javascript
  import React from 'react';
  import { useWindowDimensions, Text, View } from 'react-native';

  const ResponsiveComponent = () => {
    const { width, height } = useWindowDimensions();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {width > height ? (
          <Text>Landscape Orientation</Text>
        ) : (
          <Text>Portrait Orientation</Text>
        )}
      </View>
    );
  };

  export default ResponsiveComponent;
  ```

---

## **4.4. Using the Platform API**

The **Platform API** allows you to access the platform (iOS or Android) and adjust your app's layout or styling accordingly.

### **Example**: Conditional Rendering Based on Platform
```javascript
import { Platform, Text, View } from 'react-native';

const PlatformSpecificComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {Platform.OS === 'ios' ? (
        <Text>iOS Device</Text>
      ) : (
        <Text>Android Device</Text>
      )}
    </View>
  );
};
```

- **Platform-Specific Styles**:
You can also use the Platform API to provide platform-specific styles.

```javascript
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 20 : 10, // Different padding for iOS and Android
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 20 : 18, // Different font sizes for iOS and Android
  },
});

return (
  <View style={styles.container}>
    <Text style={styles.text}>Platform Specific Styling</Text>
  </View>
);
```

---

## **4.5. Using iOS and Android Specific Files to Separate Content**

In React Native, you can create platform-specific files to separate content and styles that are different for iOS and Android.

### **Example**: Platform-Specific Components

You can create separate files for platform-specific content. For example:
- `MyComponent.ios.js` for iOS-specific code.
- `MyComponent.android.js` for Android-specific code.

React Native automatically loads the correct file based on the platform.

```javascript
// MyComponent.ios.js
import React from 'react';
import { Text } from 'react-native';

const MyComponent = () => {
  return <Text>iOS-specific content here!</Text>;
};

export default MyComponent;
```

```javascript
// MyComponent.android.js
import React from 'react';
import { Text } from 'react-native';

const MyComponent = () => {
  return <Text>Android-specific content here!</Text>;
};

export default MyComponent;
```

When you import `MyComponent` in other files, React Native will automatically pick the correct version based on the platform.

```javascript
import MyComponent from './MyComponent'; // Will load the appropriate file based on the platform
```

- **Using `Platform.select`**: This method allows you to define platform-specific values within the same file.

```javascript
import { Platform, Text, View } from 'react-native';

const platformText = Platform.select({
  ios: 'Hello iOS User!',
  android: 'Hello Android User!',
});

const PlatformSpecificComponent = () => {
  return (
    <View>
      <Text>{platformText}</Text>
    </View>
  );
};
```

---

## **Summary**

1. **Dynamic Styles**: Use percentage-based values, Flexbox, and `PixelRatio` for responsive layout design.
2. **Dimensions API**: Use `Dimensions` or `useWindowDimensions` to get screen dimensions and dynamically adjust layout.
3. **Screen Orientation**: Use `Dimensions` and `useWindowDimensions` to adjust the layout for portrait and landscape orientations.
4. **Platform API**: Use `Platform.OS` for platform-specific logic and styles (iOS vs. Android).
5. **Platform-Specific Files**: Create platform-specific files (`.ios.js`, `.android.js`) or use `Platform.select()` for conditional rendering based on platform.




# **5. Navigation in React Native**

React Navigation is one of the most popular libraries used for navigating between screens in React Native. It supports different types of navigators like **Stack Navigator**, **Drawer Navigator**, **Bottom Tab Navigator**, and more. Here's a breakdown of how to use these navigators effectively:

---

## **5.1. Stack Navigator Usage**

A **Stack Navigator** manages a stack of screens, where each screen is pushed onto the stack when navigating to it and popped off when navigating back.

### **5.1.1 Basic Usage of Stack Navigator**

1. **Installation**:
   To get started with React Navigation, you first need to install the core libraries and the `@react-navigation/stack` package:

   ```bash
   npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
   ```

2. **Setup**: You need to wrap your application with the `NavigationContainer` and create a `Stack.Navigator`.
- navigate usage with a back button, when using .replace, there si no back button

   ```javascript
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   import { View, Text, Button } from 'react-native';

   const Stack = createStackNavigator();

   function HomeScreen({ navigation }) {
     return (
       <View>
         <Text>Home Screen</Text>
         <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
       </View>
     );
   }

   function DetailsScreen() {
     return (
       <View>
         <Text>Details Screen</Text>
       </View>
     );
   }

   export default function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="Details" component={DetailsScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```

- **`Stack.Navigator`**: This is the container that defines the stack and handles screen navigation.
- **`Stack.Screen`**: Defines each individual screen within the stack. It requires a `name` and `component` prop.
- can using `presentation: 'model'` to show in a model mode

### **5.1.2 Navigating between screens**:

- **`navigation.navigate('ScreenName')`**: Navigate to another screen in the stack.
- **`navigation.goBack()`**: Go back to the previous screen in the stack.

---

## **5.2. Passing Data, Styles, and Functions between Screens**

You can pass data, styles, or functions between screens via **navigation params** or **props**.

### **5.2.1 Passing Data**

```javascript
// Passing data from HomeScreen to DetailsScreen
function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { message: 'Hello from Home!' })}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { message } = route.params; // Accessing the data passed from HomeScreen
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
```

### **5.2.2 Passing Styles or Functions**

You can also pass styles or functions as props when navigating:

```javascript
function HomeScreen({ navigation }) {
  const handlePress = () => {
    alert('Button Pressed!');
  };
  
  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { func: handlePress })}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { func } = route.params; // Accessing the function passed from HomeScreen
  return (
    <View>
      <Button title="Call Function" onPress={func} />
    </View>
  );
}
```

---

## **5.3. Drawer Navigator Usage**

A **Drawer Navigator** is a type of navigator that provides a side menu (drawer) where you can navigate between different screens.

**Basic Usage of Drawer Navigator**

1. **Installation**:

   ```bash
   npm install @react-navigation/drawer
   ```

2. **Setup**:

   ```javascript
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createDrawerNavigator } from '@react-navigation/drawer';
   import { View, Text, Button } from 'react-native';

   const Drawer = createDrawerNavigator();

   function HomeScreen() {
     return (
       <View>
         <Text>Home Screen</Text>
       </View>
     );
   }

   function ProfileScreen() {
     return (
       <View>
         <Text>Profile Screen</Text>
       </View>
     );
   }

   export default function App() {
     return (
       <NavigationContainer>
         <Drawer.Navigator initialRouteName="Home">
           <Drawer.Screen name="Home" component={HomeScreen} />
           <Drawer.Screen name="Profile" component={ProfileScreen} />
         </Drawer.Navigator>
       </NavigationContainer>
     );
   }
   ```

- **`Drawer.Navigator`**: This component wraps all screens that will be part of the drawer navigation.
- **`Drawer.Screen`**: This defines individual screens that will appear in the drawer menu.

---

## **5.4 Bottom Tab Navigator Usage**

A **Bottom Tab Navigator** provides a navigation bar at the bottom of the screen with icons or text for navigating between different screens.

**Basic Usage of Bottom Tab Navigator**

1. **Installation**:

   ```bash
   npm install @react-navigation/bottom-tabs
   ```

2. **Setup**:

   ```javascript
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
   import { View, Text } from 'react-native';

   const Tab = createBottomTabNavigator();

   function HomeScreen() {
     return (
       <View>
         <Text>Home Screen</Text>
       </View>
     );
   }

   function SettingsScreen() {
     return (
       <View>
         <Text>Settings Screen</Text>
       </View>
     );
   }

   export default function App() {
     return (
       <NavigationContainer>
         <Tab.Navigator initialRouteName="Home">
           <Tab.Screen name="Home" component={HomeScreen} />
           <Tab.Screen name="Settings" component={SettingsScreen} />
         </Tab.Navigator>
       </NavigationContainer>
     );
   }
   ```

- **`Tab.Navigator`**: This component wraps all the screens for the bottom tab navigation.
- **`Tab.Screen`**: Defines individual screens in the bottom tab navigation.

---

## **5.5. Nesting Navigators (Combining Stack and Drawer Navigators)**

You can nest different navigators inside each other to create complex navigation structures. For example, you can have a **Drawer Navigator** at the root level and a **Stack Navigator** inside one of the drawer screens.

**Example: Nesting Stack and Drawer Navigators**

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

In this example:
- The **Drawer Navigator** is the root navigator.
- The **Home Screen** uses a **Stack Navigator** to handle screen transitions.

- **Benefits of Nesting**:
  - Allows a combination of different navigation styles (e.g., Drawer + Stack, Tab + Stack).
  - Provides flexibility in building complex app navigation structures.

---

# **6. App-wide State Management with Redux & ContextAPI**

State management is a crucial part of large applications, and React Native provides two primary methods to manage app-wide state: **Context API** and **Redux**. Both have their use cases, and choosing between them depends on the complexity and size of your application.

---

## **6.1 Using Context API in React Native**

The **Context API** in React allows you to share values between components without having to explicitly pass props at every level. It is a simpler and lightweight solution for state management compared to Redux, and it's perfect for small to medium-sized applications.

**Steps to Use Context API**

1. **Create Context**: First, create a context to store your state.

   ```javascript
   import React, { createContext, useState } from 'react';

   // Creating the Context
   const MyContext = createContext();

   export const MyContextProvider = ({ children }) => {
     const [value, setValue] = useState('Hello from Context API');
   
     return (
       <MyContext.Provider value={{ value, setValue }}>
         {children}
       </MyContext.Provider>
     );
   };
   
   export default MyContext;
   ```

2. **Wrap Your App with the Context Provider**: The provider component makes the context available to all child components.

   ```javascript
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { View, Text } from 'react-native';
   import { MyContextProvider } from './MyContext';
   
   const App = () => {
     return (
       <NavigationContainer>
         <MyContextProvider>
           {/* Rest of your app components */}
         </MyContextProvider>
       </NavigationContainer>
     );
   };
   
   export default App;
   ```

3. **Consume the Context in Your Components**: Use `useContext` hook to access the state in any child component.

   ```javascript
   import React, { useContext } from 'react';
   import { View, Text, Button } from 'react-native';
   import MyContext from './MyContext';

   const HomeScreen = () => {
     const { value, setValue } = useContext(MyContext);

     return (
       <View>
         <Text>{value}</Text>
         <Button title="Change Text" onPress={() => setValue('Updated from Home Screen')} />
       </View>
     );
   };

   export default HomeScreen;
   ```

- **Key Points**:
  - Use `createContext` to create the context and `useContext` to access it.
  - The **Provider** component holds the state and wraps the application or specific components where the state is needed.
  - It's ideal for small apps or non-complex state management needs.

---

## **6.2 Using Redux in React Native**

**Redux** is a more powerful state management solution that is well-suited for larger applications where state changes are frequent and need to be tracked in a predictable manner. Redux provides a global store for state, actions to modify the state, and reducers to manage state transitions.

**Steps to Use Redux**

1. **Installation**:

   To use Redux with React Native, install the necessary libraries:

   ```bash
   npm install redux react-redux
   ```

2. **Creating Actions**: Actions are plain JavaScript objects that describe the type of state change.

   ```javascript
   // actions.js
   export const setMessage = (message) => ({
     type: 'SET_MESSAGE',
     payload: message,
   });
   ```

3. **Creating Reducers**: Reducers specify how the state changes in response to an action.

   ```javascript
   // reducer.js
   const initialState = {
     message: 'Hello from Redux',
   };

   const messageReducer = (state = initialState, action) => {
     switch (action.type) {
       case 'SET_MESSAGE':
         return { ...state, message: action.payload };
       default:
         return state;
     }
   };

   export default messageReducer;
   ```

4. **Creating the Store**: Use `createStore` from Redux to create the global store.

   ```javascript
   // store.js
   import { createStore } from 'redux';
   import messageReducer from './reducer';

   const store = createStore(messageReducer);

   export default store;
   ```

5. **Wrap Your App with `Provider`**: The `Provider` component from `react-redux` makes the Redux store available to your app.

   ```javascript
   import React from 'react';
   import { Provider } from 'react-redux';
   import { NavigationContainer } from '@react-navigation/native';
   import store from './store';
   import HomeScreen from './HomeScreen';

   const App = () => {
     return (
       <Provider store={store}>
         <NavigationContainer>
           <HomeScreen />
         </NavigationContainer>
       </Provider>
     );
   };

   export default App;
   ```

6. **Connecting Components to Redux**: Use the `useSelector` hook to read from the state and `useDispatch` to dispatch actions.

   ```javascript
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { View, Text, Button } from 'react-native';
   import { setMessage } from './actions';

   const HomeScreen = () => {
     const message = useSelector((state) => state.message); // Reading from Redux state
     const dispatch = useDispatch(); // Access the dispatch function

     return (
       <View>
         <Text>{message}</Text>
         <Button title="Change Message" onPress={() => dispatch(setMessage('Updated from Redux'))} />
       </View>
     );
   };

   export default HomeScreen;
   ```

- **Key Points**:
  - Redux has three main parts: **Actions**, **Reducers**, and the **Store**.
  - Actions are dispatched to modify the state, and reducers handle the logic for updating the state.
  - `useSelector` is used to access the global state, and `useDispatch` is used to dispatch actions.
  - **Redux DevTools** can be used for better debugging and state tracking.

---

## **6.3 Comparison of Context API and Redux**

- **Context API** is a good choice for small to medium-sized applications where the state doesn't need to be shared widely or frequently.
- **Redux** is more powerful and suited for complex applications where state needs to be shared across many components and you need precise control over state transitions.
- **Redux** provides better support for middleware like **redux-thunk** for asynchronous actions, while **Context API** is simpler and doesn't require setting up extra tools.

Both tools have their place, and the choice depends on the complexity of your app's state management needs.


# **7. Sending HTTP Requests**

In React Native, sending HTTP requests is a common task when connecting to a backend server or fetching remote data. One of the easiest ways to do this is by using **Axios**, a promise-based HTTP client for the browser and Node.js. Another option is using Firebase, a platform that provides backend services like real-time databases, authentication, and more. Here’s how to send HTTP requests and connect your app with remote data, including Firebase.

---

## **7.1 Connecting a Backend & Working with Remote Data With Firebase**

Firebase provides several backend services, and one of the most common is its **Realtime Database** or **Firestore**. These databases use REST APIs under the hood, making it easy to integrate Firebase with your React Native app using HTTP requests.

### **7.1.1 Setting up a Dummy Backend with Firebase**

To get started with Firebase, follow these steps:

1. **Install Firebase SDK**:
   ```bash
   npm install firebase
   ```

2. **Initialize Firebase**:
   In your project, create a file (`firebase.js`) to initialize Firebase using your Firebase project's configuration details.

   ```javascript
   import firebase from 'firebase/app';
   import 'firebase/database'; // If you plan to use Realtime Database

   const firebaseConfig = {
     apiKey: 'your-api-key',
     authDomain: 'your-auth-domain',
     databaseURL: 'your-database-url',
     projectId: 'your-project-id',
     storageBucket: 'your-storage-bucket',
     messagingSenderId: 'your-messaging-sender-id',
     appId: 'your-app-id',
   };

   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   } else {
     firebase.app(); // if already initialized
   }

   export default firebase;
   ```

3. **Using Firebase Database**: Here’s how you can fetch and store data in Firebase Realtime Database.

   ```javascript
   import firebase from './firebase';

   // Fetch data from Firebase
   firebase
     .database()
     .ref('/data')
     .once('value')
     .then((snapshot) => {
       console.log(snapshot.val()); // Logs the data
     });

   // Save data to Firebase
   firebase
     .database()
     .ref('/data')
     .set({ name: 'John', age: 30 });
   ```

Now that Firebase is set up, you can send HTTP requests using **Axios** to interact with Firebase or any other backend services.

---

### **7.1.2 Send HTTP Requests**

Axios makes it easy to send various types of HTTP requests (GET, POST, PUT, DELETE) from your React Native app. Here's how you can use Axios to interact with a backend API or Firebase.

1. **Install Axios**:
   ```bash
   npm install axios
   ```

2. **Send HTTP Requests**:
   
   You can send GET, POST, PUT, and DELETE requests with Axios. Here are some examples of how to do that:

   ```javascript
   import axios from 'axios';

   // Send GET request to fetch data
   axios.get('https://your-api-url.com/data')
     .then(response => {
       console.log(response.data); // Handle the response data
     })
     .catch(error => {
       console.error(error); // Handle errors
     });

   // Send POST request to submit data
   axios.post('https://your-api-url.com/data', {
     name: 'John',
     age: 30,
   })
     .then(response => {
       console.log(response.data); // Handle the response data
     })
     .catch(error => {
       console.error(error); // Handle errors
     });

   // Send PUT request to update data
   axios.put('https://your-api-url.com/data/1', {
     name: 'Jane',
     age: 31,
   })
     .then(response => {
       console.log(response.data); // Handle the response data
     })
     .catch(error => {
       console.error(error); // Handle errors
     });

   // Send DELETE request to delete data
   axios.delete('https://your-api-url.com/data/1')
     .then(response => {
       console.log(response.data); // Handle the response data
     })
     .catch(error => {
       console.error(error); // Handle errors
     });
   ```

   - **`axios.get(url)`**: Fetches data from the provided URL.
   - **`axios.post(url, data)`**: Sends data to the server to create a new resource.
   - **`axios.put(url, data)`**: Sends data to update an existing resource.
   - **`axios.delete(url)`**: Deletes a resource from the server.

3. **Using `useEffect` to Fetch Data**:
   In functional components, you can use `useEffect` to fetch data when the component mounts.

   ```javascript
   import React, { useState, useEffect } from 'react';
   import { View, Text } from 'react-native';
   import axios from 'axios';

   const DataFetchingComponent = () => {
     const [data, setData] = useState(null);

     useEffect(() => {
       axios.get('https://your-api-url.com/data')
         .then(response => {
           setData(response.data);
         })
         .catch(error => {
           console.error(error);
         });
     }, []); // Empty dependency array means the effect runs once when the component mounts

     return (
       <View>
         {data ? (
           <Text>{JSON.stringify(data)}</Text>
         ) : (
           <Text>Loading...</Text>
         )}
       </View>
     );
   };

   export default DataFetchingComponent;
   ```

---

### **7.1.3 Handling Loading & Error State**

When fetching remote data, it's important to handle loading and error states to provide a better user experience.

1. **Handling Loading State**:
   A loading spinner or overlay can inform users that data is being fetched.

   ```javascript
   import React, { useState, useEffect } from 'react';
   import { View, Text, ActivityIndicator } from 'react-native';
   import axios from 'axios';

   const DataFetchingComponent = () => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       axios.get('https://your-api-url.com/data')
         .then(response => {
           setData(response.data);
           setLoading(false);
         })
         .catch(error => {
           setError('Something went wrong!');
           setLoading(false);
         });
     }, []);

     if (loading) {
       return (
         <View>
           <ActivityIndicator size="large" color="#0000ff" />
           <Text>Loading...</Text>
         </View>
       );
     }

     if (error) {
       return <Text>{error}</Text>;
     }

     return (
       <View>
         <Text>{JSON.stringify(data)}</Text>
       </View>
     );
   };

   export default DataFetchingComponent;
   ```

2. **Error Handling**:
   You can display an error message or an error overlay if the request fails.

   ```javascript
   const ErrorOverlay = ({ message }) => (
     <View style={{ padding: 20, backgroundColor: 'red', color: 'white' }}>
       <Text>{message}</Text>
     </View>
   );
   ```

   And use it like:

   ```javascript
   if (error) {
     return <ErrorOverlay message="Failed to load data. Please try again." />;
   }
   ```

---


# **8. User Authentication**

Firebase provides a seamless solution for handling user authentication in React Native apps. You can manage user login, signup, authentication status, and securely store authentication data on the device. In addition to Firebase SDK, **Axios** can also be used for authentication tasks by making requests to Firebase Authentication endpoints. 

---

## **8.1 Signing Users Up & Logging In**

Firebase Authentication provides multiple methods for authenticating users, such as **email/password authentication** and third-party providers like **Google** or **Facebook**. Axios can be used to interact with Firebase’s REST API for authentication.

### **8.1.1 Firebase Authentication with Axios**

Firebase Authentication can be accessed via the Firebase REST API. Axios can help us send requests to Firebase endpoints for user sign-in and sign-up.

1. **Sign Up Users with Axios**:
   
   To create a new user with email and password, you can use the `signUp` endpoint provided by Firebase. Axios sends a `POST` request to the Firebase Authentication REST API.

   ```javascript
   import axios from 'axios';

   const signUp = async (email, password) => {
     const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY';
     try {
       const response = await axios.post(url, {
         email,
         password,
         returnSecureToken: true,
       });
       console.log('User signed up:', response.data);
       // Store user data or token as needed
     } catch (error) {
       console.error('Error signing up:', error.message);
     }
   };
   ```

2. **Log In Users with Axios**:

   To log users in, you can send a `POST` request to the `signInWithPassword` endpoint.

   ```javascript
   const signIn = async (email, password) => {
     const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY';
     try {
       const response = await axios.post(url, {
         email,
         password,
         returnSecureToken: true,
       });
       console.log('User logged in:', response.data);
       // Store user data or token as needed
     } catch (error) {
       console.error('Error logging in:', error.message);
     }
   };
   ```

- Replace `YOUR_API_KEY` with your Firebase Web API key, which can be found in your Firebase console.
- The `returnSecureToken` is a flag that ensures Firebase returns an authentication token along with the response.

---

## **8.2 Managing Authentication Status**

Once a user logs in or signs up, you need to manage their authentication status across your app. You can do this by monitoring the user's authentication state and updating the UI accordingly.

### **8.2.1 Monitoring Authentication State with Firebase SDK**

You can use Firebase's built-in method `onAuthStateChanged` to monitor changes in the user's authentication state (e.g., when they log in, log out, or the app is reloaded).

```javascript
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {user ? (
        <Text>Welcome, {user.email}</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
};
```

- The `onAuthStateChanged` listener updates the `user` state every time there is a change in the user's authentication status.
- If `user` is not `null`, it indicates the user is logged in.

### **8.2.2 Using Axios to Check Authentication Status**

You can also use Axios to verify a user's token with Firebase. This involves sending the user’s Firebase authentication token to the backend for validation.

```javascript
const checkAuthStatus = async (token) => {
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=YOUR_API_KEY';
  try {
    const response = await axios.post(url, {
      idToken: token,
    });
    console.log('User data:', response.data);
    // Handle user data after token validation
  } catch (error) {
    console.error('Error validating token:', error.message);
  }
};
```

- In this case, you would pass the user's **ID token** to Firebase to confirm if it's still valid.

---

## **8.3 Storing Authentication Status on the Device**

To persist the user's authentication status across app restarts, you need to store the authentication data locally. This can be done using **AsyncStorage** (for non-sensitive data) or **Secure Storage** (for sensitive data).

### **8.3.1 Storing Authentication Data Using AsyncStorage**

**AsyncStorage** is a simple key-value storage system for React Native. It can be used to store basic authentication data such as the user's ID token or email.

```bash
npm install @react-native-async-storage/async-storage
```

- **Storing Token**: Store the authentication token once the user is logged in.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAuthData = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};
```

- **Retrieving Token**: Retrieve the stored authentication token on app start.

```javascript
const getAuthData = async () => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      console.log('User token:', token);
    } else {
      console.log('No auth token found');
    }
  } catch (error) {
    console.error('Error retrieving auth data:', error);
  }
};
```

- **Removing Token**: Remove the authentication data when the user logs out.

```javascript
const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('@auth_token');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};
```

### **8.3.2 Storing Sensitive Data with Secure Storage**

For sensitive data like user tokens or passwords, it's recommended to use **React Native Secure Storage**, which encrypts the data locally on the device.

Install the required package:

```bash
npm install react-native-secure-storage
```

Use it to store and retrieve data securely:

```javascript
import RNSecureStorage from 'react-native-secure-storage';

// Store sensitive data securely
const storeSecureAuthData = async (token) => {
  try {
    await RNSecureStorage.set('auth_token', token);
  } catch (error) {
    console.error('Error storing secure data:', error);
  }
};

// Retrieve sensitive data securely
const getSecureAuthData = async () => {
  try {
    const token = await RNSecureStorage.get('auth_token');
    if (token) {
      console.log('Secure auth token:', token);
    } else {
      console.log('No secure auth token found');
    }
  } catch (error) {
    console.error('Error retrieving secure data:', error);
  }
};
```

Thank you for the clarification! I see that you want me to follow your suggested structure more closely, especially when you're specifying methods or additional tips in parentheses for each topic. I'll adjust the format accordingly and make sure to follow your instructions. Here’s the updated explanation, focusing on your tips and methods for each topic.

---

# **9. Using Native Device Features**

This section will follow your requested methods for handling native features, such as the **Camera**, **Location**, and database management, including specific use cases like permission control, launching the camera, handling location data, and managing interactive maps.

---

## **9.1 Using Camera (Expo Camera)**

To work with the camera using **Expo Camera**, we need to install the necessary libraries, manage permissions, and handle the camera functionality (launch, take pictures, and flip camera). Here's the process using the `expo-camera` library:

1. **Install Expo Camera:**
   ```bash
   expo install expo-camera
   ```

2. **Request Camera Permission** (method in the brackets):
   To access the camera, you need to request permission from the user. Here’s how you do it with the `Camera.requestCameraPermissionsAsync()` function:

   ```javascript
   import { Camera } from 'expo-camera';
   import React, { useState, useEffect } from 'react';
   import { View, Text } from 'react-native';

   const CameraComponent = () => {
     const [hasPermission, setHasPermission] = useState(null);
     const [type, setType] = useState(Camera.Constants.Type.back);

     useEffect(() => {
       const getPermission = async () => {
         const { status } = await Camera.requestCameraPermissionsAsync();
         setHasPermission(status === 'granted');
       };
       getPermission();
     }, []);

     if (hasPermission === null) {
       return <Text>Requesting camera permission...</Text>;
     }

     return (
       <View style={{ flex: 1 }}>
         {hasPermission === false ? (
           <Text>No access to camera</Text>
         ) : (
           <Camera style={{ flex: 1 }} type={type}>
             {/* Add your camera UI components */}
           </Camera>
         )}
       </View>
     );
   };

   export default CameraComponent;
   ```

3. **Launch Camera for Photos:**
   You can launch the camera to capture a photo using the `expo-image-picker` library. First, install it:

   ```bash
   expo install expo-image-picker
   ```

   Then use `launchCameraAsync()` to take photos:

   ```javascript
   import * as ImagePicker from 'expo-image-picker';

   const takePhoto = async () => {
     const result = await ImagePicker.launchCameraAsync({
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });

     if (!result.canceled) {
       console.log('Photo taken:', result.uri);
     }
   };
   ```

---

## **9.2 Get the Location (expo-location)**

To access the device's location, you can use the **Expo Location API**. You’ll also work with Google Maps and **Markers** for displaying the location interactively.

1. **Install Expo Location**:
   ```bash
   expo install expo-location
   ```

2. **Get Current Location (using `getCurrentLocationAsync`)**:
   Use `expo-location` to fetch the current location of the user:

   ```javascript
   import * as Location from 'expo-location';
   import React, { useState, useEffect } from 'react';
   import { Text, View } from 'react-native';

   const LocationComponent = () => {
     const [location, setLocation] = useState(null);

     useEffect(() => {
       const getLocation = async () => {
         const { status } = await Location.requestForegroundPermissionsAsync();
         if (status === 'granted') {
           const userLocation = await Location.getCurrentPositionAsync({});
           setLocation(userLocation);
         }
       };
       getLocation();
     }, []);

     return (
       <View>
         {location ? (
           <Text>
             Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
           </Text>
         ) : (
           <Text>Loading...</Text>
         )}
       </View>
     );
   };

   export default LocationComponent;
   ```

3. **Display Location on Google Maps (Static API)**:
   Use the **Google Maps Static API** to show a map with a marker indicating the current location.

   ```javascript
   const getMapUrl = (latitude, longitude) => {
     return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&markers=color:red|${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
   };
   ```

   To display it:

   ```javascript
   import { Image } from 'react-native';

   const MapImage = ({ latitude, longitude }) => {
     const mapUrl = getMapUrl(latitude, longitude);

     return <Image source={{ uri: mapUrl }} style={{ width: 400, height: 400 }} />;
   };
   ```

4. **Interactive Map with `react-native-maps`**:
   Use **react-native-maps** for creating interactive maps with markers.

   ```bash
   npm install react-native-maps
   ```

   ```javascript
   import React from 'react';
   import MapView, { Marker } from 'react-native-maps';

   const InteractiveMap = ({ latitude, longitude }) => {
     const region = {
       latitude,
       longitude,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     };

     return (
       <MapView style={{ width: '100%', height: 400 }} region={region}>
         <Marker coordinate={{ latitude, longitude }} />
       </MapView>
     );
   };

   export default InteractiveMap;
   ```

---

# **10. Using Database (SQLite)**

SQLite allows local storage of data within the app, which is useful for offline capabilities. You can use `openDatabase`, `transaction`, and `executeSql` methods to interact with SQLite.

1. **Install SQLite for React Native**:
   ```bash
   npm install sqlite3
   ```

2. **Opening the Database**:

   ```javascript
   import SQLite from 'sqlite3';

   const db = new SQLite.Database('myDatabase.db');

   db.open((err) => {
     if (err) {
       console.log('Error opening database:', err);
     } else {
       console.log('Database opened successfully');
     }
   });
   ```

3. **Create a Table**:

   ```javascript
   const createTable = () => {
     db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)', (err) => {
       if (err) {
         console.log('Error creating table:', err);
       } else {
         console.log('Table created successfully');
       }
     });
   };
   ```

4. **Inserting Data**:

   ```javascript
   const insertData = (name, age) => {
     db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], (err) => {
       if (err) {
         console.log('Error inserting data:', err);
       } else {
         console.log('Data inserted successfully');
       }
     });
   };
   ```

5. **Querying Data**:

   ```javascript
   const fetchData = () => {
     db.all('SELECT * FROM users', [], (err, rows) => {
       if (err) {
         console.log('Error fetching data:', err);
       } else {
         console.log('Fetched data:', rows);
       }
     });
   };
   ```

6. **Handling Transactions**:

   ```javascript
   const handleTransaction = () => {
     db.serialize(() => {
       db.run('BEGIN TRANSACTION');
       db.run('INSERT INTO users (name, age) VALUES (?, ?)', ['John', 30]);
       db.run('INSERT INTO users (name, age) VALUES (?, ?)', ['Alice', 25]);
       db.run('COMMIT');
     });
   };
   ```

---

11. Building React Native Apps Without Expo

The comparesion among Expo Manged Workflow, Expor bare workflow and react Native CLI

Using Expo's Bare Workflow, explai nthe more complex setting process

Using React Native CLI(no expo)


12. Publishing React Native Apps

Configuration for production
With Expo: Configure the  project, Build App binaries with expo's cloud service(advantage: no local resources used & you can build for all target platforms), Submit to App Stores
Withoud Expo: configture the project, build app binaries locally, submit to app stores
Configureing for production: permission, App name & indentifier, Environement vaiables, Icons & Splash screen;

use build expo apps with EAS(install the eas-cli, login to expo account, configure the project - eas build:configure, run a build, )

Build without expo


13. Push Notifications

Working with local notifications: Expo notification package(Notifications.scheduleNotificationAsync, setNotificationHandler, addNotificationReceivedListener, addNotificationResponseReceivedListener); 

Push notification setup, using the push token, Sending Push notification















