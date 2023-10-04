import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

interface Props<T> {
  schema: z.Schema<any, any>;
  defaultValues: DefaultValues<T>;
}

export const useControlledForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: Props<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return form;
};
