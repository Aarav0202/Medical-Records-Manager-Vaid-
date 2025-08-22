"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export function RegisterForm() {
  const [role, setRole] = useState<"customer" | "carDealership">("customer");

  return (
    <>
      {/* Role selection */}
      <div className="grid gap-2 mt-2">
        <Label>Register as</Label>
        <RadioGroup
          value={role}
          onValueChange={(v) => setRole(v as "customer" | "carDealership")}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem id="role-customer" value="customer" />
            <Label htmlFor="role-customer" className="cursor-pointer">
              Customer
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem id="role-dealer" value="carDealership" />
            <Label htmlFor="role-dealer" className="cursor-pointer">
              Car Dealership
            </Label>
          </div>
        </RadioGroup>
        {/* Hidden input so FormData picks it up */}
        <input type="hidden" name="role" value={role} />
      </div>

      {/* Name */}
      <div className="grid gap-1 mt-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" required />
      </div>

      {/* Email */}
      <div className="grid gap-1 mt-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      {/* Password */}
      <div className="grid gap-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
    </>
  );
}
