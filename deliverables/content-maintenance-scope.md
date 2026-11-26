# 固定布局内容维护范围清单（Content Maintenance Scope）

- **客户名称**：苏州西宫针织服饰有限公司（Suzhou Xigong Knitting Apparel Co., Ltd.）
- **租户 ID**：`3730d1b9-f198-4ca8-a78e-3565d338d1b5`
- **正式域名**：`xgzzfs.com`
- **交付分组**：1 组（任务 ID `05613bea-9ed2-4143-8ba8-2dacbca870d7`，构建与待清理期间 `admin_group = NULL`）

## 1. 后台基础业务模块（唯一日常编辑入口）

| 模块 | 权威数据源 | 后台入口 | 前台消费位置 |
|---|---|---|---|
| 站点设置（品牌、联系、SEO、多语言） | `tenants` (`id = 3730d1b9-...`) | 环球后台「站点设置」 | 全站页头/页脚、Contact 页、Metadata & JSON-LD |
| 产品分类 | `product_categories` (2 分类) | 环球后台「产品分类」 | `/#product-categories`、`/products` 筛选器 |
| 产品库 | `products` (3 款女装针织，34 张 R2 图) | 环球后台「产品管理」 | `/#featured-products`、`/products`、`/products/[slug]` |
| 新闻 / 文章 | `articles` (默认空，无演示文章) | 环球后台「文章管理」 | `/news`、`/news/[slug]`、`/sitemap.xml` |
| 客户询盘 | `inquiries` + `inquiry_captcha_challenges` | 环球后台「询盘管理」 | `/#contact-rfq` (`home-rfq`)、`/contact` (`contact-rfq`)、`/products/[slug]` (`product-rfq`) |

## 2. 固定布局边界与受控内容点位
- 保持代码控制的浅色现代科技感布局、9 大首页板块、Three.js 7G 针织工艺 3D 交互台、响应式断点与视口动效不被自由拖拽或自定义 HTML/CSS 破坏。
- 单语英文首发（`default_language = "en"`、`supported_languages = ["en"]`），完整保留 `*_i18n` 与 DeepSeek 手动一键翻译扩展接口。
- SEO 服务默认未开通（`seo_tenant_config` 无启用记录）。
- 服务到期守卫已安装（`middleware.ts` + `lib/service-expiry-guard.ts` + `app/service-expired/page.tsx`），默认关闭（`enforcement_enabled = false`、`expires_on = null`）并严格 fail-open。
