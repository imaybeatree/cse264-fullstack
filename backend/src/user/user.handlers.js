import { prisma } from "../db/db.js";

export async function getUserByName(username) {
  const user = await prisma.user.findUnique({
    where: { username: `${username.toLowerCase()}` },
  });

  return user;
}

export async function saveOnboarding(req, res) {
  try {
    console.log("res.locals.user:", res.locals.user);
    console.log("req.body:", req.body);

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
      select: {
        email: true,
        username: true,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
}