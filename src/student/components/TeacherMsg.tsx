import {Card, Typography} from "@mui/material";
import React from "react";

type Props = {
    teacherMsg: string | null;
}

export default function TeacherMsg({teacherMsg}: Props) {
    return (
        <>
            {teacherMsg && (
                <Card>
                    <Typography variant='h6'>Message from the Teacher</Typography>
                    <Typography>
                        <div dangerouslySetInnerHTML={{__html: teacherMsg ?? ""}}></div>
                    </Typography>
                </Card>
            )}
        </>
    );
}
