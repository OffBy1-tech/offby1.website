import { useState } from "react";

interface Chip {
  label: string;
  variant?: "solid" | "outlined";
}

interface ProductLink {
  label: string;
  href: string;
  primary?: boolean;
  internal?: boolean;
}

interface Product {
  name: string;
  tag: string;
  logo?: string;
  logoBg: string;
  chips: Chip[];
  detail: {
    description: string;
    links: ProductLink[];
  };
}

const products: Product[] = [
  {
    name: "Tab Nest",
    tag: "Free tab manager with Google Drive sync. Save, organize, and search your tabs — privacy-first.",
    logo: "/assets/tabNest_256.png",
    logoBg: "#1A56DB",
    chips: [
      { label: "browser extension" },
      { label: "open source", variant: "solid" },
    ],
    detail: {
      description:
        "A Chrome extension that saves and restores your tab sessions, syncs them to Google Drive, and lets you search across all your saved tabs — no account required, no data sold.",
      links: [
        {
          label: "Install from Chrome Web Store",
          href: "https://chromewebstore.google.com/detail/tab-nest/necndpocofifkmoekdgbocklmmnldegp",
          primary: true,
        },
        {
          label: "Product page",
          href: "/tabnest",
          internal: true,
        },
        {
          label: "View source on GitHub",
          href: "https://github.com/offby1-tech/tabnest",
        },
      ],
    },
  },
  {
    name: "Mouseflare",
    tag: "Free desktop utility that keeps your mouse cursor visible with a particle trail and a one-key flare.",
    logo: "/assets/mouseflare_256.png",
    logoBg: "#F97316",
    chips: [
      { label: "macOS & Windows" },
      { label: "open source", variant: "solid" },
    ],
    detail: {
      description:
        "A native desktop app that trails your cursor with a subtle particle effect and fires a bright flare at its exact position on a global hotkey — no account, no telemetry, no network calls.",
      links: [
        {
          label: "Download for macOS or Windows",
          href: "https://github.com/OffBy1-tech/Mouse-Flare/releases",
          primary: true,
        },
        {
          label: "Product page",
          href: "/mouseflare",
          internal: true,
        },
        {
          label: "View source on GitHub",
          href: "https://github.com/OffBy1-tech/Mouse-Flare",
        },
      ],
    },
  },
  {
    name: "Sentinel",
    tag: "Desktop restock monitor that watches product pages and alerts you the moment stock lands.",
    logo: "/assets/sentinel_logo.png",
    logoBg: "#3F7CE8",
    chips: [
      { label: "macOS & Windows" },
      { label: "public beta", variant: "solid" },
    ],
    detail: {
      description:
        "Add a product link once and Sentinel checks it in the background on a schedule you choose, then alerts you by desktop notification, Discord, or webhook the moment it changes. Works with Walmart, Target, Best Buy, Amazon, Shopify stores, and more. Runs on your computer.",
      links: [
        {
          label: "Visit sentineldrops.com",
          href: "https://www.sentineldrops.com",
          primary: true,
        },
        {
          label: "Read the announcement",
          href: "/blog/sentinel-sold-out-until-it-isnt",
          internal: true,
        },
      ],
    },
  },
];

function ProductRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="venture-article">
      <button
        className="venture-row"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="v-idx">[{index}]</span>
        <span className="v-logo" aria-hidden="true">
          {product.logo ? (
            <img src={product.logo} alt="" />
          ) : (
            <span
              className="v-logo-fallback"
              style={{ background: product.logoBg }}
            >
              {product.name[0]}
            </span>
          )}
        </span>
        <span>
          <span className="v-name">{product.name}</span>
          <br />
          <span className="v-tag">{product.tag}</span>
        </span>
        <span className="v-meta">
          {product.chips.map((c) => (
            <span
              key={c.label}
              className={"v-chip" + (c.variant ? ` ${c.variant}` : "")}
            >
              {c.label}
            </span>
          ))}
          <span className="toggle">{open ? "[−]" : "[+]"}</span>
        </span>
      </button>
      {open && (
        <div className="venture-detail">
          <p className="venture-detail-desc">{product.detail.description}</p>
          <div className="venture-detail-links">
            {product.detail.links.map((link) => (
              <a
                key={link.href}
                className={"btn " + (link.primary ? "btn-primary" : "btn-secondary")}
                href={link.href}
                target={link.internal ? undefined : "_blank"}
                rel={link.internal ? undefined : "noopener noreferrer"}
              >
                {link.label}{link.internal ? "" : " ↗"}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProductList() {
  return (
    <div className="ventures">
      {products.map((p, i) => (
        <ProductRow key={p.name} product={p} index={i} />
      ))}
    </div>
  );
}
