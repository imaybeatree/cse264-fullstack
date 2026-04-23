import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";

export async function getUserByName(username) {
  const user = await prisma.user.findUnique({
    where: { username: `${username.toLowerCase()}` },
  });

  return user;
}

export async function saveOnboarding(req, res) {
  try {
    // console.log("res.locals.user:", res.locals.user);
    // console.log("req.body:", req.body);

    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "No authenticated user id found",
      });
    }

    const { preferences, allergies, ingredients } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        preferences,
        allergies,
        ingredients,
        onboarded: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Onboarding preferences saved",
      user: updatedUser,
    });
  } catch (error) {
    console.error("saveOnboarding error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(400).json({
        error: "No authenticated user id found",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: {
        passwordHash: true,
        onboarded: true,
        verified: true
      }
    });

    res.status(200).json(user);
  } catch (err) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
}

export async function updateCurrentUserName(req, res) {
  try {
    const userId = res.locals.user?.userId;
    const username = req.body?.username?.trim();

    if (!userId) {
      return res.status(400).json({
        error: "No authenticated user id found",
      });
    }

    if (!username) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    if (username.length > 40) {
      return res.status(400).json({
        error: "Name must be 40 characters or fewer",
      });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { username },
      select: {
        id: true,
        username: true,
        email: true,
        preferences: true,
        allergies: true,
        ingredients: true,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.error("updateCurrentUserName error:", err);
    res.status(500).json({
      error: "Failed to update name",
    });
  }
}

export async function updateCurrentUserPassword(req, res) {
  try {
    const userId = res.locals.user?.userId;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "No authenticated user id found",
      });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: "Old password, new password, and confirmation are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "New passwords do not match",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "New password must be at least 8 characters",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const oldPasswordMatches = await bcrypt.compare(
      oldPassword,
      user.passwordHash
    );

    if (!oldPasswordMatches) {
      return res.status(401).json({
        error: "Old password is incorrect",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("updateCurrentUserPassword error:", err);
    res.status(500).json({
      error: "Failed to update password",
    });
  }
}

// get saved recipes
export async function getSavedRecipesHandler(req, res) {
    // console.log("res.locals:", res.locals);
  const userId = res.locals.user.userId;
  try {
    const saved = await prisma.savedRecipe.findMany({ where: { userId } });
    res.json(saved);
  } catch (error) {
    console.error("GET saved recipes error:", error);
    res.status(500).json({ message: "Failed to fetch saved recipes" });
  }
}

// save a recipe
export async function saveRecipeHandler(req, res) {
  const userId = res.locals.user.userId;
  const { id, title, image, readyInMinutes, pricePerServing } = req.body;
  try {
    const existing = await prisma.savedRecipe.findUnique({
      where: { userId_recipeId: { userId, recipeId: id } },
    });
    if (existing) return res.status(409).json({ message: "Already saved" });

    const saved = await prisma.savedRecipe.create({
      data: { userId, recipeId: id, title, image, readyInMinutes, pricePerServing },
    });
    res.status(201).json(saved);
  } catch (error) {
    console.error("POST saved recipe error:", error);
    res.status(500).json({ message: "Failed to save recipe" });
  }
}

// unsave a recipe
export async function unsaveRecipeHandler(req, res) {
  const userId = res.locals.user.userId;
  const recipeId = parseInt(req.params.id);
  try {
    await prisma.savedRecipe.delete({
      where: { userId_recipeId: { userId, recipeId } },
    });
    res.json({ message: "Recipe unsaved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unsave recipe" });
  }
}
