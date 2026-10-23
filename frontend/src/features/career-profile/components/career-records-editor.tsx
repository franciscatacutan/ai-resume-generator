import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface EditableRecord {
  id: string;
  verified: boolean;
}

interface CareerRecordsEditorProps<T extends EditableRecord> {
  title: string;
  description: string;
  records: T[];
  createRecord: () => T;
  renderFields: (record: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  onChange: (records: T[]) => void;
}

export function CareerRecordsEditor<T extends EditableRecord>({
  title,
  description,
  records,
  createRecord,
  renderFields,
  onChange,
}: CareerRecordsEditorProps<T>) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [draft, setDraft] = useState<T | null>(null);

  function updateRecord(id: string, patch: Partial<T>): void {
    onChange(records.map((record) => (record.id === id ? { ...record, ...patch } : record)));
  }

  function addRecord(): void {
    const newRecord = createRecord();
    onChange([...records, newRecord]);
    setShowAddForm(false);
    setDraft(null);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setDraft(createRecord());
            setShowAddForm(true);
          }}
        >
          Add
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Label className="font-medium">{record.verified ? "Reviewed" : "Needs review"}</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateRecord(record.id, {
                      verified: !record.verified,
                    } as Partial<T>)
                  }
                >
                  {record.verified ? "Mark unreviewed" : "Mark reviewed"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onChange(records.filter((item) => item.id !== record.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
            {renderFields(record, (patch) => updateRecord(record.id, patch))}
          </div>
        ))}

        {records.length === 0 && !showAddForm && (
          <p className="text-sm text-muted-foreground">No records added yet.</p>
        )}

        {showAddForm && draft && (
          <div className="space-y-4 rounded-lg border border-dashed p-4">
            {renderFields(draft, (patch) =>
              setDraft((current) => (current ? { ...current, ...patch } : current)),
            )}
            <div className="flex gap-2">
              <Button type="button" onClick={addRecord}>
                Add record
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setDraft(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RecordTextField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
