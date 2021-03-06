import {
    Box,
    Container, Divider,
    Grid,
    Typography,
    Card,
    CardContent,
    Table, TableHead, TableRow, TableCell, TableBody, TableContainer, AccordionDetails, AccordionSummary, Accordion
} from "@mui/material";
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import Image from 'next/image'
import Survey from "../../result/Survey";

export default function Single({ result }){
    /*
    const [expanded, setExpanded] = useState();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
     */

    const courseRecommendArranged = (course) => {
        if(!course) return []
        let data = []
        for(let i = 0; i < course.length; i++){
            if(!data){
                data.push({ id: course[i].id, course: course[i].rank, rank: course[i].rank })
            }else if(data && data[data.length-1]?.rank === course[i].rank){
                data[data.length-1].course += `${course[i].course}, `
            }else{
                data.push({ id: course[i].id, course: course[i].course+', ', rank: course[i].rank })
            }

        }
        return data
    }

    return (
        <>
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between' ,
                        flexWrap: 'wrap',
                        px: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            my: 2,
                            justifyContent: 'start',
                        }}
                    >
                        <Image
                            src={result?.logo_url ? result?.logo_url: "/static/images/default.png"}
                            alt="Picture of the author"
                            width={80}
                            height={80}
                            quality={100}
                            placeholder="blur"
                            blurDataURL={result?.logo_url ? result?.logo_url: "/static/images/default.png"}
                        />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h5">
                                {result.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mt: 1}}
                            >
                                {result.description}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Card sx={{ marginTop: '20px' }}>
                    <CardContent sx={{ padding: '12px 24px' }}>
                        <Typography variant="cool">
                            Exam Result
                        </Typography>
                        <TableContainer sx={{ marginTop: '10px' }}>
                            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ maxWidth: 10 }}>
                                            Subject
                                        </TableCell>
                                        <TableCell align="left">
                                            Score
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {result.result_details.map((r, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                {r.subject}
                                            </TableCell>
                                            <TableCell>
                                                {r.score} / {r.total}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Survey/>
                <Card sx={{ marginTop: '20px', marginBottom: '100px' }}>
                    <CardContent sx={{ padding: '12px 24px' }}>
                        <Typography variant="cool">
                            Course Recommended
                        </Typography>
                        <Box>
                            <Typography variant="caption" mb={2}>
                                Same no. in ranking has no particular order
                            </Typography>
                        </Box>
                        {result?.course_recommended.length === 0 ? (
                            <Box sx={{ pl: 5, mt: 2 }}>
                                <Typography variant="body2" mb={2}>
                                    Unable to get result due to your score.
                                </Typography>
                            </Box>
                        ): (
                            <TableContainer sx={{ marginTop: '10px' }}>
                                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: 150 }}>
                                                Rank
                                            </TableCell>
                                            <TableCell align="left">
                                                Course
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {courseRecommendArranged(result?.course_recommended).map((d, i) => (
                                            <TableRow key={d.id}>
                                                <TableCell sx={{ pl: 4 }}>
                                                    {d.rank}
                                                </TableCell>
                                                <TableCell>
                                                    {d.course.substring(0, d.course.length - 2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {/*result?.result_courses.map((d, i) => (
                                            <Box key={d.id} sx={{ pl: 5 }}>
                                                <Typography variant="cool" mb={2}>
                                                    {d.rank} <span style={{ marginLeft: '10px' }}>{d.course}</span>
                                                </Typography>
                                            </Box>
                                        ))*/}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
