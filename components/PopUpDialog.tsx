import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface PopUpDialogProps {
  travelId: string;
  userName: string;
  onClose: () => void;
}

export function PopUpDialog({ travelId, userName, onClose }: PopUpDialogProps) {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const userId = localStorage.getItem("userId");
  const { toast } = useToast();

  const handleJoin = async () => {
    const response = await axios.post("/api/jointravel", {
      travelId: travelId,
      phone: mobileNumber,
      userId: userId,
    });
    if (response.status === 200) {
      toast({
        variant: "success",
        title: "Successfully Joined",
        description: "Your travel was successfully added with your friend",
      });
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join with {userName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mobilenumber" className="text-right">
              Phone
            </Label>
            <Input
              id="mobilenumber"
              className="col-span-3"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleJoin}>
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
