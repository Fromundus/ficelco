// components/GeneralTabs.tsx
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

interface GeneralTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
}

export default function CustomTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  className,
  listClassName,
}: GeneralTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      value={value}
      onValueChange={onChange}
      className={cn("w-full border rounded-lg", className)}
    >
      <TabsList className={cn("flex flex-wrap", listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) =>
        tab.content !== undefined ? (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ) : null
      )}
    </Tabs>
  );
}
