import { useEffect, useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import type { CreateInsightProp } from "../../../../lib/schemas/insight.ts";
import { toUTC } from "../../utils/dateConverter.ts";

type AddInsightProps = ModalProps & {
  onAdd: (payload: CreateInsightProp) => Promise<void>;
};

export const AddInsight = ({ onAdd, ...modalProps }: AddInsightProps) => {
  const [form, setForm] = useState({
    brandId: BRANDS[0].id,
    text: "",
  });
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (modalProps.open) {
      setForm({
        brandId: BRANDS[0].id,
        text: "",
      });
      setError(false);
    }
  }, [modalProps.open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    if (!form.text.trim()) {
      setError(true);
      return;
    }

    const payload: CreateInsightProp = {
      brandId: Number(form.brandId),
      // Convert to UTC time
      date: toUTC(new Date()),
      text: form.text,
    };

    await onAdd(payload);
    setForm({ ...form, text: "" });
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Brand
          <select
            className={styles["field-input"]}
            value={form.brandId}
            onChange={(e) =>
              setForm({ ...form, brandId: Number(e.target.value) })}
          >
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
        </label>
        {error && <p style={{ color: "red" }}>Insight cannot be empty</p>}
        <Button
          className={styles.submit}
          type="submit"
          label="Add insight"
        />
      </form>
    </Modal>
  );
};
