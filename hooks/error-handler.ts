import { useToast } from "@/components/ui/use-toast";

export const useErrorHandler = () => {
  const { toast } = useToast();

  const onError = (error: any) => {
    if (error.name === "TRPCClientError") {
      toast({
        variant: "destructive",
        title: error.data?.code,
        description: error.message,
      });
    } else {
      console.error(error);
    }
  };

  return { onError };
};
