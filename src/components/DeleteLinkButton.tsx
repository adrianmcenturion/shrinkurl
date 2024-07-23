import {Cross1Icon} from "@radix-ui/react-icons";

import {deleteLinksByID} from "@/app/dashboard/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";

import {toast} from "./ui/use-toast";

interface DeleteProps {
  id: number;
}

export default function DeleteLinkButton({id}: DeleteProps) {
  const handleDeleteLinks = async () => {
    const {error} = await deleteLinksByID(id);

    if (error) {
      toast({
        title: "Error al borrar el link",
        variant: "destructive",
      });
    }

    toast({
      title: "Link borrado",
      duration: 750,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Cross1Icon className="size[1.5rem]" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Borrar link</AlertDialogTitle>
          <AlertDialogDescription>Estás seguro que deseas borrar el link?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteLinks}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
