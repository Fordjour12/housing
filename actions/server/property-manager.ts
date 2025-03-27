"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { propertyManagerFirm, teamMember } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export interface PropertyManagerSetupData {
  firm: {
    businessName: string;
    streetAddress: string;
    unitNumber?: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    website?: string;
    propertiesCount?: string;
  };
  management: {
    defaultContactEmail: string;
    defaultContactPhone: string;
    notifyNewInquiries: boolean;
    notifyMaintenanceRequests: boolean;
    notifyRentReminders: boolean;
    notifyLeaseExpirations: boolean;
    applicationProcess: string;
    screeningCreditCheck: boolean;
    screeningBackgroundCheck: boolean;
    screeningIncomeVerification: boolean;
    leaseSigningPreference: string;
  };
  team: {
    teamMembers?: Array<{
      email: string;
      role: string;
    }>;
  };
}

export async function createPropertyManagerFirm(data: PropertyManagerSetupData) {
  try {
    // Get the current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to create a property management firm",
      };
    }

    // Generate a unique ID for the firm
    const firmId = nanoid();

    // Create the property management firm
    await db.insert(propertyManagerFirm).values({
      id: firmId,
      userId: session.user.id,
      businessName: data.firm.businessName,
      streetAddress: data.firm.streetAddress,
      unitNumber: data.firm.unitNumber,
      city: data.firm.city,
      state: data.firm.state,
      zip: data.firm.zip,
      phoneNumber: data.firm.phoneNumber,
      website: data.firm.website,
      propertiesCount: data.firm.propertiesCount,
      defaultContactEmail: data.management.defaultContactEmail,
      defaultContactPhone: data.management.defaultContactPhone,
      notifyNewInquiries: data.management.notifyNewInquiries ? "true" : "false",
      notifyMaintenanceRequests: data.management.notifyMaintenanceRequests ? "true" : "false",
      notifyRentReminders: data.management.notifyRentReminders ? "true" : "false",
      notifyLeaseExpirations: data.management.notifyLeaseExpirations ? "true" : "false",
      applicationProcess: data.management.applicationProcess,
      screeningCreditCheck: data.management.screeningCreditCheck ? "true" : "false",
      screeningBackgroundCheck: data.management.screeningBackgroundCheck ? "true" : "false",
      screeningIncomeVerification: data.management.screeningIncomeVerification ? "true" : "false",
      leaseSigningPreference: data.management.leaseSigningPreference,
    });

    // Add the current user as an administrator
    await db.insert(teamMember).values({
      id: nanoid(),
      firmId: firmId,
      userId: session.user.id,
      role: "administrator",
    });

    // Add team members if provided
    if (data.team.teamMembers && data.team.teamMembers.length > 0) {
      // In a real application, you would:
      // 1. Check if users with these emails exist
      // 2. Send invitations to join the team
      // 3. Create placeholder records until they accept
      
      // Here we'll just log that we would process team members
      console.log(`Would process ${data.team.teamMembers.length} team member invitations`);
    }

    return {
      success: true,
      data: {
        id: firmId,
      },
    };
  } catch (error) {
    console.error("Error creating property management firm:", error);
    return {
      success: false,
      error: "Failed to create property management firm",
    };
  }
}

export async function getPropertyManagerFirm(id: string) {
  try {
    const result = await db
      .select()
      .from(propertyManagerFirm)
      .where(eq(propertyManagerFirm.id, id))
      .limit(1);

    return {
      success: true,
      data: result[0] || null,
    };
  } catch (error) {
    console.error("Error fetching property management firm:", error);
    return {
      success: false,
      error: "Failed to fetch property management firm",
    };
  }
}

export async function updatePropertyManagerFirm(id: string, data: Partial<PropertyManagerSetupData>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to update a property management firm",
      };
    }

    // Verify ownership
    const existingFirm = await db
      .select()
      .from(propertyManagerFirm)
      .where(eq(propertyManagerFirm.id, id))
      .limit(1);

    if (!existingFirm[0] || existingFirm[0].userId !== session.user.id) {
      return {
        success: false,
        error: "You do not have permission to update this property management firm",
      };
    }

    // Create update object based on data provided
    const updateData: Partial<typeof propertyManagerFirm.$inferInsert> = {};
    
    if (data.firm) {
      if (data.firm.businessName) updateData.businessName = data.firm.businessName;
      if (data.firm.streetAddress) updateData.streetAddress = data.firm.streetAddress;
      if (data.firm.unitNumber !== undefined) updateData.unitNumber = data.firm.unitNumber;
      if (data.firm.city) updateData.city = data.firm.city;
      if (data.firm.state) updateData.state = data.firm.state;
      if (data.firm.zip) updateData.zip = data.firm.zip;
      if (data.firm.phoneNumber) updateData.phoneNumber = data.firm.phoneNumber;
      if (data.firm.website !== undefined) updateData.website = data.firm.website;
      if (data.firm.propertiesCount !== undefined) updateData.propertiesCount = data.firm.propertiesCount;
    }
    
    if (data.management) {
      if (data.management.defaultContactEmail) updateData.defaultContactEmail = data.management.defaultContactEmail;
      if (data.management.defaultContactPhone) updateData.defaultContactPhone = data.management.defaultContactPhone;
      if (data.management.notifyNewInquiries !== undefined) updateData.notifyNewInquiries = data.management.notifyNewInquiries ? "true" : "false";
      if (data.management.notifyMaintenanceRequests !== undefined) updateData.notifyMaintenanceRequests = data.management.notifyMaintenanceRequests ? "true" : "false";
      if (data.management.notifyRentReminders !== undefined) updateData.notifyRentReminders = data.management.notifyRentReminders ? "true" : "false";
      if (data.management.notifyLeaseExpirations !== undefined) updateData.notifyLeaseExpirations = data.management.notifyLeaseExpirations ? "true" : "false";
      if (data.management.applicationProcess) updateData.applicationProcess = data.management.applicationProcess;
      if (data.management.screeningCreditCheck !== undefined) updateData.screeningCreditCheck = data.management.screeningCreditCheck ? "true" : "false";
      if (data.management.screeningBackgroundCheck !== undefined) updateData.screeningBackgroundCheck = data.management.screeningBackgroundCheck ? "true" : "false";
      if (data.management.screeningIncomeVerification !== undefined) updateData.screeningIncomeVerification = data.management.screeningIncomeVerification ? "true" : "false";
      if (data.management.leaseSigningPreference) updateData.leaseSigningPreference = data.management.leaseSigningPreference;
    }
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date();
    
    // Update the firm
    await db
      .update(propertyManagerFirm)
      .set(updateData)
      .where(eq(propertyManagerFirm.id, id));

    return {
      success: true,
      data: {
        id,
      },
    };
  } catch (error) {
    console.error("Error updating property management firm:", error);
    return {
      success: false,
      error: "Failed to update property management firm",
    };
  }
} 