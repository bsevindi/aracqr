===========Windows===========
BitBucket adresinden ilk kez "git clone" yapildiktan sonra cd ile proje
dosyasina girilerek asagidaki komutlar calistirilir:
$ npm install
$ react-native link
$ mkdir android\app\src\main\assets
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android\app\src\main\assets\index.android.bundle --assets-dest android\app\src\main\res

Bu komutlardan sonra proje Android'de calistirilabilir.Eger Android'de calisti-
rilmak istenince herhangi bir hata alinirsa (proje hic yuklenmez ve hata olursa)
asagidaki komutlar calistirilir:
$ cd android
$ gradlew clean
$ cd ..

===========macOS===========
BitBucket adresinden ilk kez "git clone" yapildiktan sonra cd ile proje
dosyasina girilerek asagidaki komutlar calistirilir:
$ npm install
$ react-native link

Projeyi iOS'ta Calistirmak:
$ react-native run-ios

Projeyi Android'de Calistirmak:
oncelikle bir tane Android Virtual Device acilir:
$ emulator -avd Nexus_5X_API_23

yeni bir terminal penceresi acilir ve proje klasorune cd ile gidilir, ardindan
asagidaki komut calistirilir:
$ react-native run-android
