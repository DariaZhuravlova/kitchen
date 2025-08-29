import type {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({authSecret: process.env.AUTH_SECRET || "не задано"});
}
