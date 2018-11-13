package com.pulsage;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.reactnative.camera.RNCameraPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import cl.json.RNSharePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

import com.facebook.CallbackManager;



public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTaskPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFetchBlobPackage(),
            new ReactVideoPackage(),
            new RNSharePackage(),
            new FastImageViewPackage(),
            new RNCameraPackage(),
            new ReactVideoPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    //AppEventsLogger.activateApp(this);
    BackgroundTaskPackage.useContext(this);
    SoLoader.init(this, /* native exopackage */ false);
  }

}
