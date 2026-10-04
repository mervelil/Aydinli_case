import Image from "next/image";
import type { Banner } from "./config";
import { CopyCouponButton } from "./CopyCouponButton";
import styles from "./OnsiteCampaign.module.css";

type Props = {
  banner: Banner;
  couponCode: string;
  copiedResetMs: number;
};

export function BannerCard({ banner, couponCode, copiedResetMs }: Props) {
  return (
    <article className={styles.banner} data-theme={banner.theme}>
      {banner.imageSrc && (
        <Image
          className={styles.bannerImage}
          src={banner.imageSrc}
          alt={banner.imageAlt ?? ""}
          fill
          sizes="(min-width: 768px) 360px, 45vw"
        />
      )}

      <div className={styles.bannerBody}>
        <h3 className={styles.bannerTitle}>{banner.title}</h3>
        {banner.description && <p className={styles.bannerDesc}>{banner.description}</p>}
        {banner.hasCoupon && (
          <CopyCouponButton code={couponCode} bannerId={banner.id} resetMs={copiedResetMs} />
        )}
      </div>
    </article>
  );
}
