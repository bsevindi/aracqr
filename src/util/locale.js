import { Platform, NativeModules } from 'react-native';

class Locale {
  stringsEn = {
    carListScreenTitle: 'Car List',
    add: 'Add',
    connectionProblem: 'Connection problem. Check your Internet connection',
    tryAgain: 'Try Again',
    qrCommunication: 'Car Communication by QR',
    error: 'Error',
    vehicleNotSaved: 'Vehicle cannot be saved. Check Internet connection.',
    ok: 'OK',
    plateOrText: 'Enter plate or some text (Red Corolla)',
    save: 'Save',
    newCarScreenTitle: 'Add New Vehicle',
    notificationsScreenTitle: 'Notifications',
    called: 'you have been called for your car.',
    viewPdfScreenTitle: 'PDF',
    sharePdfTitle: 'CarQR PDF',
    sharePdfMessage: 'Print the attached PDF file and place it somewhere visible inside your car.',
    pdfCreateError: 'Error while creating PDF. Try again.',
    export: 'Export',
    viewQrScreenTitle: 'QR',
    reachMe: 'For issues regarding to my vehicle, you can reach me by scanning '
      + 'the QR code or visiting the following URL: ',
    saveAsPdf: 'Save As PDF',
    maxCarLimit: 'Maximum car limit',
    emptyCarList: 'Your car list is empty. Start adding a car by using the Add '
      + 'button on the upper-right corner of your screen',
  }

  stringsTr = {
    carListScreenTitle: 'Araç Listesi',
    add: 'Ekle',
    connectionProblem: 'Bağlantı problemi var. İnternet bağlantınızı kontrol edin.',
    tryAgain: 'Tekrar Dene',
    qrCommunication: 'Karekodla Araç İletişim',
    allowCommunication: 'İzin Verdiğiniz Ölçüde İletişim Kurun',
    error: 'Hata',
    vehicleNotSaved: 'Araç kaydedilemedi. İnternet bağlantınızı kontrol ediniz.',
    ok: 'Tamam',
    plateOrText: 'Plaka veya metin giriniz.(Kırmızı Corolla)',
    save: 'Kaydet',
    newCarScreenTitle: 'Yeni Araç Ekle',
    notificationsScreenTitle: 'Uyarılar',
    called: 'aracınızın yanına çağrıldınız.',
    viewPdfScreenTitle: 'PDF',
    sharePdfTitle: 'CarQR PDF',
    sharePdfMessage: 'Ekteki PDF dosyasını yazdırıp aracınızın içinde '
      + 'görülebilir bir yere koyunuz.',
    pdfCreateError: 'PDF oluşturulurken hata oluştu. Tekrar deneyiniz.',
    export: 'Dışa Aktar',
    viewQrScreenTitle: 'QR',
    reachMe: 'Aracımla ilgili konularda bana ulaşmak için ' +
      'yukarıdaki QR kodu telefonunuzdan okutunuz veya şu adrese giriniz:',
    saveAsPdf: 'PDF Olarak Kaydet',
    maxCarLimit: 'Kaydedebileceğiniz en fazla araç sayısı',
    emptyCarList: 'Araç listeniz boş. Ekranınızın sağ üst köşesindeki ekle '
      + 'düğmesini kullanarak yeni araç ekleyiniz.',
  };

  constructor() {
    this.langRegion = 'en_US';
    if (Platform.OS === 'android') {
      this.langRegion = NativeModules.I18nManager.localeIdentifier || this.langRegion;
    } else if (Platform.OS === 'ios') {
      this.langRegion = NativeModules.SettingsManager.settings.AppleLocale || this.langRegion;
    }
    this.lang = this.langRegion.substring(0, 2);
    this.adjustLanguageStrings();
  }

  adjustLanguageStrings = () => {
    this.strings = this.lang === 'tr' ? this.stringsTr : this.stringsEn;
  };
}

export const locale = new Locale();
