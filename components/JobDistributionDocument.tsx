import React from 'react';
import { FileText, Users, Calendar, CheckCircle } from 'lucide-react';

const JobDistributionDocument: React.FC = () => {
  const employees = [
    {
      name: 'Səbuhi Qurbanov',
      position: 'Baş məsləhətçi',
      area: 'Strateji rəhbərlik və ümumi koordinasiya',
      duties: [
        'Təhsil müəssisələrinə ümumi nəzarət (Əsasnamə 3.3.1, 3.3.7)',
        'Xüsusi təhsilə nəzarət və dəstək',
        'Peşə təmayüllü təhsilin təşkili və inkişafı (PTPk nəzarəti)',
        'Yeni təyinat almış direktor və müavinlərin peşəkar adaptasiyası və metodiki dəstəyi',
        'Peşə təmayüllü siniflərin təşkili və fəaliyyətinə nəzarət',
        'Strateji hədəflərin müəyyənləşdirilməsi və izlənməsi (Əsasnamə 3.4.5)',
        'Məktəbəqədər təhsil müəssisələri (MQ) ilə əlaqələndirmə və nəzarət',
        'Təhsilin inkişafı üzrə müxtəlif məqsədli proqramların hazırlanmasında iştirak (Əsasnamə 3.3.2)',
        'Regional təhsil sisteminin sosial-iqtisadi inkişaf perspektivləri nəzərə alınmaqla proqnozlaşdırılması (Əsasnamə 3.4.5)',
        'Sektorun səlahiyyətləri dairəsinə aid məsələlər üzrə analitik materialların və arayışların ümumiləşdirilməsi (Əsasnamə 3.3.10)',
      ],
    },
    {
      name: 'Elvin Mustafayev',
      position: 'Aparıcı məsləhətçi',
      area: 'Monitorinq, nəzarət və keyfiyyət təminatı',
      duties: [
        'Təhsil müəssisələrində kompleks monitorinq yoxlamalarının keçirilməsi (Əsasnamə 2.1.1, 3.3.6)',
        'Dərs bölgüsünün hazırlanması, təhlili və təsdiqinə nəzarət',
        'Vətəndaş ərizə və şikayətlərinin araşdırılması və qanunvericilikdə müəyyən edilmiş qaydada həlli (Əsasnamə 5.5.3)',
        'Məktəblərdə özünüqiymətləndirmə sisteminin yaradılması və idarə edilməsi, layihələrin hazırlanması və əlaqələndirilməsi (Əsasnamə 3.3.8)',
        'Sinifdaxili idarəetmə, qiymətləndirmə və təlim-tərbiyə prosesinin keyfiyyətli təşkilinə nəzarət (Əsasnamə 3.3.7)',
        'Monitorinqlər nəticəsində aşkarlanmış nöqsanların aradan qaldırılması üçün təkliflərin hazırlanması (Əsasnamə 3.4.8)',
        'Təhsil və təlim-tərbiyə prosesi ilə bağlı təhlillərin aparılması və keyfiyyətyönümlü təkliflərin hazırlanması (Əsasnamə 2.1.2)',
      ],
    },
    {
      name: 'Abid Ağayev',
      position: 'Aparıcı məsləhətçi',
      area: 'Rəqəmsal texnologiyalar və innovativ sistemlər',
      duties: [
        'ATİS (Azərbaycan Təhsil İdarəetmə Sistemi) və SİM (Sorğu İdarəetmə Modulu) platformalarının idarə edilməsi və texniki dəstəyi',
        'STEM+, Rəqəmsal Biblioteka və elektron jurnallar üzrə müəllimlərin rəqəmsal bacarıqlarının inkişafı (Əsasnamə 3.3.5)',
        'İdarə əməkdaşlarının İKT kompetensiyalarının artırılması üzrə təlimlərin təşkili',
        'Komputer əsaslı qiymətləndirmə sistemlərinin (CBT - Computer-Based Testing) təşkili və texniki-metodik təminatı',
        'İdarənin idarəetmə proseslərinin avtomatlaşdırılması üzrə innovativ həllərin və rəqəmsal transformasiya layihələrinin işlənib hazırlanması (Əsasnamə 3.4.1)',
      ],
    },
    {
      name: 'Zülfiyyə Həmzəyeva',
      position: 'Aparıcı məsləhətçi',
      area: 'Kadr idarəetməsi və hesabatlılıq',
      duties: [
        'Məktəb İdarəetmə Qrupları (MİQ), vakansiyalar və ikinci iş yerlərinin idarə edilməsi',
        'Sektorun hesabatlılıq sisteminin təşkili, rayonlar üzrə statistik məlumatların və hesabatların toplanması (Əsasnamə 3.3.9, 3.3.13)',
        'ATİS platformasında məlumat və linklərin yerləşdirilməsi, yenilənməsi',
        'Fəxri adlara təqdimat üçün siyahıların hazırlanması',
        'Fərqlənən müəllim və işçilərin İdarə tərəfindən təltif edilməsi üçün təşəbbüslərin irəli sürülməsi (Əsasnamə 3.4.7)',
        'Təhsil müəssisələrinin rəhbər heyətinin yerdəyişməsi və kadr potensialının inkişafı ilə bağlı məsələlərin təhlilində iştirak, əsaslandırılmış rəy və təkliflərin hazırlanması (Əsasnamə 3.4.6)',
        'Sektorun illik hesabatının hazırlanmasında iştirak (Əsasnamə 3.3.13)',
      ],
    },
    {
      name: 'Vüsalə Vəzirova',
      position: 'Məsləhətçi',
      area: 'Peşəkar inkişaf və metodik dəstək',
      duties: [
        'Müəllimlərin peşəkar inkişaf proqramlarının planlaşdırılması və həyata keçirilməsi (Əsasnamə 2.1.1, 3.3.5)',
        'Dayaq məntəqələrinin fəaliyyətinin koordinasiyası və metodiki seminarların təşkili (Əsasnamə 3.3.5)',
        'Müəllim təlimlərinin təşkili, nəzarəti və statistik təhlili',
        'Qrant layihələrinin hazırlanmasına dəstək və koordinasiya',
        'Yeni işə qəbul olunan və gənc müəllimlərin mentorluq proqramının təşkili',
        'Sertifikasiya prosesində iştirak edəcək və əvvəlki cəhdlərdə uğursuz olan müəllimlərlə məsləhətləşmələrin keçirilməsi',
        'Təhsil metodistləri ilə əməkdaşlıq və metodik xidmətin təşkilinin təmin edilməsində iştirak (Əsasnamə 3.3.5)',
      ],
    },
    {
      name: 'Züleyxa Zəkili',
      position: 'Məsləhətçi',
      area: 'Qiymətləndirmə, olimpiadalar və müsabiqələr',
      duties: [
        'IV və VI siniflərin dövlət monitorinqinin təşkili və keçirilməsi',
        'Regional fənn olimpiadaları (RFO), Regional fənn müsabiqələri (RFM), Lisenziya verilmiş müəllimlərin olimpiadası (LMO), "Kənquru" beynəlxalq riyaziyyat müsabiqəsi və Haktoun müsabiqələrinin təşkili (Əsasnamə 3.3.3, 3.3.4)',
        '"Ən yaxşı təqdimat" müəllim müsabiqəsinin koordinasiyası',
        'Ali təhsil müəssisələrinə qəbulla bağlı məlumatlandırma və dəstək işlərinin həyata keçirilməsi',
        '"Zəfər" fənn olimpiadasının regional səviyyədə təşkili (Əsasnamə 3.3.4)',
        'Məktəbdənkənar maarifləndirici və inkişaf tədbirlərinin koordinasiyası',
        'Beynəlxalq qiymətləndirmə tədqiqatlarında (PISA, TIMSS, PIRLS və digər) şagirdlərin iştirakının təmin edilməsi (Əsasnamə 3.3.3)',
      ],
    },
    {
      name: 'Yusif Dəmirov',
      position: 'Məsləhətçi',
      area: 'Planlaşdırma və qiymətləndirmə sistemləri',
      duties: [
        'Tədrisin Keyfiyyəti sektorunun fəaliyyət planının tərtib edilməsi və icrasının təmin edilməsi (Əsasnamə 3.3.12)',
        'Məktəbdaxili İnkişaf Planlarının (MİP) hazırlanmasına metodiki dəstək və nəzarət',
        'Tədrisin vəziyyəti ilə bağlı müəllim sorğularının keçirilməsi və nəticələrinin təhlili',
        'Təhsilalanların bilik və nailiyyətlərinin qiymətləndirilməsi sisteminin müasir tələblər baxımından inkişaf etdirilməsinə dair təkliflərin hazırlanması (Əsasnamə 2.1.3)',
      ],
    },
    {
      name: 'Günel Hacıyeva',
      position: 'Məsləhətçi',
      area: 'Texniki dəstək və məlumat idarəetməsi',
      duties: [
        'Siniflər üzrə monitorinq materiallarının, alətlərinin və sənədlərinin hazırlanması (Əsasnamə 3.3.6)',
        'SİM platformasında tədris məzmununun və metodiki materialların yerləşdirilməsi',
        'ƏMAS (Elektron Məktəb Attestasiya Sistemi) üzrə əlaqələndirmə və texniki-informasiya dəstəyi',
        'Siniflər üzrə müxtəlif fənlər üzrə mütəmadi qiymətləndirmə testlərinin və imtahan materiallarının hazırlanması, keçirilməsi və nəticələrin təhlili (Əsasnamə 3.3.6, 3.3.9)',
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <div className="text-sm mb-2">Azərbaycan Respublikası Elm və Təhsil Nazirliyi yanında</div>
        <div className="text-sm mb-2">Məktəbəqədər və Ümumi Təhsil üzrə Dövlət Agentliyinin</div>
        <div className="text-sm mb-4">Şəki-Zaqatala Regional Təhsil İdarəsi</div>
        <h1 className="text-2xl font-bold mt-4">TƏDRİSİN KEYFİYYƏTİ SEKTORUNUN</h1>
        <h2 className="text-xl font-bold mt-2">İŞ BÖLGÜSÜ SƏNƏDI</h2>
        <div className="mt-4 text-sm text-gray-600">
          <div>2025-ci il tarixli _____ nömrəli əmrin əlavəsi</div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8 text-sm leading-relaxed">
        <p className="mb-4">
          <strong>1. ÜMUMI MÜDDƏALAR</strong>
        </p>
        <p className="mb-4 text-justify">
          1.1. Bu sənəd Azərbaycan Respublikası Elm və Təhsil Nazirliyi yanında Məktəbəqədər və Ümumi Təhsil üzrə Dövlət Agentliyinin Şəki-Zaqatala Regional Təhsil İdarəsinin (bundan sonra - İdarə) Tədrisin Keyfiyyəti sektorunda (bundan sonra - sektor) işçilər arasında vəzifə və məsuliyyətlərin bölgüsünü müəyyən edir.
        </p>
        <p className="mb-4 text-justify">
          1.2. İş bölgüsü sektorun Əsasnaməsinə, İdarənin struktur təşkilinə və mövcud kadr potensialına uyğun olaraq hazırlanmışdır.
        </p>
        <p className="mb-4 text-justify">
          1.3. Hər bir əməkdaş öz vəzifə və məsuliyyətlərini yerinə yetirməkdə şəxsən məsuliyyət daşıyır və Azərbaycan Respublikasının qanunvericiliyinə, Nazirliyin normativ aktlarına, Agentliyin və İdarənin təşkilati-sərəncamverici sənədlərinə əsasən fəaliyyət göstərir.
        </p>
        <p className="mb-6 text-justify">
          1.4. İşçilər arasında əməkdaşlıq və qarşılıqlı dəstək prinsipləri əsasında koordinasiya təmin edilir.
        </p>

        <p className="mb-4">
          <strong>2. İŞÇİLƏR ARASINDA VƏZİFƏ BÖLGÜSÜ</strong>
        </p>
      </div>

      {/* Employees */}
      {employees.map((employee, index) => (
        <div key={index} className="mb-10 break-inside-avoid">
          <div className="bg-blue-50 p-4 rounded-t-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-900">{employee.name}</h3>
                <p className="text-sm text-blue-700 font-semibold">{employee.position}</p>
                <p className="text-xs text-blue-600 italic mt-1">{employee.area}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="border-2 border-t-0 border-blue-200 p-4 rounded-b-lg">
            <p className="font-semibold mb-3 text-sm">Vəzifə və məsuliyyətləri:</p>
            <ul className="space-y-2">
              {employee.duties.map((duty, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-justify">{duty}</span>
                </li>
              ))}
            </ul>

            {/* Signature block */}
            <div className="mt-6 pt-4 border-t border-gray-300">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-600 mb-1">İş bölgüsü ilə tanış oldum:</p>
                  <p className="text-sm">{employee.name}</p>
                </div>
                <div className="text-right">
                  <div className="border-b border-gray-400 w-32 mb-1" />
                  <p className="text-xs text-gray-500">İmza</p>
                </div>
                <div className="text-right">
                  <div className="border-b border-gray-400 w-24 mb-1" />
                  <p className="text-xs text-gray-500">Tarix</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-gray-800">
        <p className="text-sm font-bold mb-4">3. YEKUNLAŞDIRİCİ MÜDDƏALAR</p>

        <p className="text-sm mb-3 text-justify">
          3.1. Bu iş bölgüsü hər bir əməkdaşın məsuliyyət sahələrini və vəzifələrini dəqiq müəyyən edir.
        </p>

        <p className="text-sm mb-3 text-justify">
          3.2. Vəzifələrin yerinə yetirilməsində qarşılıqlı əlaqələndirmə və koordinasiya təmin edilməlidir.
        </p>

        <p className="text-sm mb-3 text-justify">
          3.3. Sektor müdiri bu iş bölgüsünün icrasına ümumi nəzarət edir və işçilərin fəaliyyətini koordinasiya edir.
        </p>

        <p className="text-sm mb-3 text-justify">
          3.4. İş bölgüsündə dəyişikliklər yalnız İdarə müdirinin əmri ilə həyata keçirilə bilər.
        </p>

        <p className="text-sm mb-6 text-justify">
          3.5. Bu sənəd imzalandığı tarixdən qüvvəyə minir və yeni iş bölgüsü təsdiq olunana qədər qüvvədə qalır.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm mb-1">Sektor müdiri:</p>
            <div className="flex items-end justify-between mt-4">
              <div className="border-b border-gray-400 w-32" />
              <div className="border-b border-gray-400 w-48 ml-4" />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">İmza</p>
              <p className="text-xs text-gray-500 mr-12">A.S.A.</p>
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Təsdiq edirəm:</p>
            <p className="text-sm mb-1">İdarə müdiri:</p>
            <div className="flex items-end justify-between mt-4">
              <div className="border-b border-gray-400 w-32" />
              <div className="border-b border-gray-400 w-48 ml-4" />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">İmza</p>
              <p className="text-xs text-gray-500 mr-12">A.S.A.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>"____" _____________ 2025-ci il</span>
          </div>
        </div>
      </div>

      {/* Print instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 print:hidden">
        <div className="flex items-start">
          <FileText className="text-blue-500 mr-3 flex-shrink-0 mt-1" size={20} />
          <div className="text-xs text-gray-600">
            <p className="font-semibold mb-2">Çap üçün təlimatlar:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Brauzerdə Ctrl+P (Windows) və ya Cmd+P (Mac) basaraq çap pəncərəsini açın</li>
              <li>Kağız ölçüsü: A4</li>
              <li>Orientasiya: Şaquli (Portrait)</li>
              <li>Kənarlar: Normal</li>
              <li>Rəngli və ya ağ-qara - seçiminizə görə</li>
              <li>Sənədi PDF formatında da saxlaya bilərsiniz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDistributionDocument;
