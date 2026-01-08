import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../../../lib/schemas/insight.ts";
import { toLocal } from "../../utils/dateConverter.ts";

type InsightsProps = {
  insights: Insight[];
  onDelete: (id: number) => void;
  className?: string;
};

export const Insights = ({ insights, onDelete, className }: InsightsProps) => {
  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, date, brandId }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>Brand ID: {brandId}</span>
                  <div className={styles["insight-meta-details"]}>
                    {/* Convert to local time */}
                    <span>{toLocal(date)}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() =>
                        onDelete(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
