# How to Cook

İki dilli, editorial yemek tarifi platformunun Faz 1 uygulaması.

## Mimari

- Next.js App Router ve locale tabanlı `/tr`, `/en` rotaları
- PostgreSQL + Prisma ile çok dilli ilişkisel veri modeli
- Auth.js credentials sağlayıcısı ve sunucu tarafı parola doğrulama
- Server Components ağırlıklı, yalnızca arama ve dil değiştiricide istemci JavaScript'i
- Dinamik metadata, canonical/hreflang, sitemap, robots ve Recipe JSON-LD
- Zod doğrulama, Vitest birim testi ve Playwright smoke testi

## Kurulum

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

`ADMIN_EMAIL` ve `ADMIN_PASSWORD` yalnızca yerel seed için kullanılır. R2 alanları Faz 1'de boş bırakılabilir; görseller yerel depodan servis edilir.

`AUTH_SECRET` (ve eski kurulumlarla uyum için `NEXTAUTH_SECRET`) benzersiz, en az 32 karakterlik rastgele bir değer olmalıdır. Örneği `openssl rand -base64 32` ile üretin; `.env` dosyasını asla repoya ya da istemci tarafına eklemeyin. Uygulama gerçek PostgreSQL bağlantısı olmadan demo verisini gösterir; giriş, yönetim ve kalıcı kullanıcı verileri için `DATABASE_URL` zorunludur.

## Kontroller

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Faz durumu

Faz 1; tasarım sistemi, çoklu dil, veri modeli, kimlik doğrulama altyapısı, tarif liste/detay, istemci arama/filtre, yönetici tarif formu iskeleti ve temel SEO'yu kapsar. Veritabanı bağlantısı olmayan ortamlarda arayüz açıkça demo tarif verilerini kullanır. R2 yükleme akışı, gerçek e-posta doğrulama ve tam yönetici CRUD'u sonraki backend entegrasyon adımıdır.
