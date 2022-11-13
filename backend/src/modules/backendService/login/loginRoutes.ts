import { Router } from "express"
import passport from "passport"
import { Request, Response } from "express"
import UserAgent from "user-agents"

const router = Router()

router.get(
    "/microsoft",
    passport.authenticate("microsoft", {
        prompt: "select_account",
        session: true,
    })
)

router.get(
    "/microsoft/callback",
    passport.authenticate("microsoft", {
        failureRedirect: "/auth/microsoft",
        successRedirect: process.env.SUCCESS_REDIRECT_URL,
        session: true,
    }),
    async (req: Request, res: Response) => {
        const device = new UserAgent(req.headers["user-agent"])
        const { prisma } = res
        if (!req.user) throw new Error("User don't exist")
        console.log(req.user?.userId)
        try {
            const user = await prisma.user_Back.create({
                data: {
                    userId: req.user?.userId || "",
                    token: req.session.id,
                    loginSession: {
                        create: {
                            detail: {
                                create: {
                                    deviceInfo: device.data.deviceCategory || "Unknow",
                                    ip: device.data.platform,
                                    tokenExpired: req.session.cookie.expires || Date.now().toString(),
                                },
                            },
                        },
                    },
                },
            })
        } catch (error) {
            res.status(500).send("These is an error in login")
            console.log(error)
        }

        console.log(device.data)
        res.redirect(process.env.SUCCESS_REDIRECT_URL || "")
    }
)

export { router as loginRoutes }
