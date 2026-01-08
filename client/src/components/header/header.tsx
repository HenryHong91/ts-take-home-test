import { useState } from "react";
import { Button } from "../button/button.tsx";
import styles from "./header.module.css";
import { AddInsight } from "../add-insight/add-insight.tsx";
import type { CreateInsightProp } from "../../../../lib/schemas/insight.ts";

export const HEADER_TEXT = "Suit Tracker Insights";

type HeaderProps = {
  onAdd: (payload: CreateInsightProp) => Promise<void>;
};

export const Header = ({ onAdd }: HeaderProps) => {
  const [addInsightOpen, setAddInsightOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logo}>{HEADER_TEXT}</span>
          <Button
            label="Add insight"
            theme="secondary"
            onClick={() => setAddInsightOpen(true)}
          />
        </div>
      </header>
      <AddInsight
        onAdd={onAdd}
        open={addInsightOpen}
        onClose={() => setAddInsightOpen(false)}
      />
    </>
  );
};
