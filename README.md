Weather Forecast App
Bu uygulama, kullanıcıya günlük hava durumu tahminlerini sağlar. Uygulama, React, TypeScript ve çeşitli modern frontend teknolojilerini kullanarak geliştirilmiştir. Ayrıca, çoklu dil desteği ve tema değiştirme özelliklerine sahiptir.

Özellikler
Hava Durumu Görüntüleme: Kullanıcılar, tarih, günlük sıcaklıklar, hava durumu ikonu ve açıklamalarıyla hava durumu bilgilerini görüntüleyebilirler.

Dil Desteği: Uygulama, farklı dillerde (şu anda İngilizce ve İspanyolca destekleniyor) kullanılabilir. Kullanıcı dilini değiştirebilir.

Tema Değiştirme: Kullanıcılar, ışık ve karanlık tema arasında geçiş yapabilirler.

Test Edilebilirlik: Uygulama, Jest ve Testing Library kullanarak test edilmiştir.

Teknolojiler
React: Kullanıcı arayüzü için React kullanılmıştır.

TypeScript: Proje TypeScript ile yazılmıştır.

React Bootstrap: UI bileşenleri için React Bootstrap kullanılmıştır.

i18next: Çoklu dil desteği için i18next kullanılmıştır.

Jest & Testing Library: Testler için Jest ve Testing Library kullanılmıştır.

GitHub Actions: CI/CD işlemleri GitHub Actions ile otomatikleştirilmiştir.

Kurulum
Bu projeyi yerel olarak çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

Gereksinimler
Node.js (v16 ve üzeri)

npm veya yarn

Adımlar
Bu repository’yi klonlayın:

bash
Kopyala
Düzenle
git clone https://github.com/kullanici-adiniz/weather-forecast-app.git
cd weather-forecast-app
Gerekli bağımlılıkları yükleyin:

bash
Kopyala
Düzenle
npm install
veya

bash
Kopyala
Düzenle
yarn install
Uygulamayı yerel olarak çalıştırın:

bash
Kopyala
Düzenle
npm start
veya

bash
Kopyala
Düzenle
yarn start
Uygulama tarayıcınızda http://localhost:3000 adresinde çalışacaktır.

Testler
Testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:

bash
Kopyala
Düzenle
npm test
ya da

bash
Kopyala
Düzenle
yarn test
Testler, Jest ve Testing Library kullanılarak yazılmıştır. CI süreci de GitHub Actions ile entegre edilmiştir, böylece her push ve pull request işleminde otomatik olarak testler çalıştırılır.

Katkı
Katkıda bulunmak isterseniz, aşağıdaki adımları takip edebilirsiniz:

Bu repository’i fork’layın.

Kendi dalınızı oluşturun (git checkout -b feature-branch).

Yapacağınız değişiklikleri commit’leyin (git commit -m 'Add feature').

Değişikliklerinizi push’layın (git push origin feature-branch).

Pull request gönderin.

Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.
