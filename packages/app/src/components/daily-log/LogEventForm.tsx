import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { PillBottle, Moon, Baby, PlusCircle } from "lucide-react";

export function LogEventForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="feeding" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feeding" className="flex items-center gap-2">
              <PillBottle className="h-4 w-4" />
              Feeding
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="diaper" className="flex items-center gap-2">
              <Baby className="h-4 w-4" />
              Diaper
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feeding" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="feedingType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottle">Bottle</SelectItem>
                    <SelectItem value="breast">Breast</SelectItem>
                    <SelectItem value="solids">Solids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (oz)</Label>
                <Input id="amount" type="number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedingNotes">Notes</Label>
                <Input id="feedingNotes" />
              </div>

              <Button className="w-full">Save Feeding</Button>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="sleepStart">Start Time</Label>
                <Input id="sleepStart" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleepEnd">End Time</Label>
                <Input id="sleepEnd" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crib">Crib</SelectItem>
                    <SelectItem value="bassinet">Bassinet</SelectItem>
                    <SelectItem value="parent_bed">Parent's Bed</SelectItem>
                    <SelectItem value="stroller">Stroller</SelectItem>
                    <SelectItem value="car_seat">Car Seat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Sleep</Button>
            </div>
          </TabsContent>

          <TabsContent value="diaper" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="diaperType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wet">Wet</SelectItem>
                    <SelectItem value="dirty">Dirty</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diaperNotes">Notes</Label>
                <Input id="diaperNotes" />
              </div>

              <Button className="w-full">Save Diaper Change</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
