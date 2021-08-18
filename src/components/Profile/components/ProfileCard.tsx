import { CardContent, CardHeader, Card, makeStyles, CardMedia, Typography, List, ListItem, ListItemText, CardActions } from '@material-ui/core';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { adminUsers } from '../../../enviroment';

const useStyles = makeStyles((theme: any) => ({}))

interface ProfileCardProps {
    users: any
}

export const ProfileCard: React.FC<ProfileCardProps> = ({users}) => {

    const classes = useStyles();

    const { username } = useParams<{ username?: string }>()

    const user = users.find((u: any) => u.username === username)

        return (
        <div className="py-10 justify-center align-items-center flex">
            {user? 
            <Card elevation={5} className="w-1/3 shadow-lg rounded-lg text-decoration:none text-left">
                    <CardHeader title={user.username + "'s profile card"}/>
                    <div className="w-full h-px bg-red m-auto border-red border"></div>
                    <CardContent className="flex flex-row h-auto pt-2">
                        <CardMedia className="h-24 w-24 m-2 border border-red rounded-full" title="avatar" image={'/avatar.svg'}/>
                        <Typography className="">
                        <List dense={false}>
                            <ListItem>
                                <ListItemText
                                    primary={(adminUsers.includes(user.username) ?
                                        <p className="flex">{user.username} 
                                            <p className="mx-2 p-1 inline-block align-top rounded-full text-red text-xxs border border-red">Admin</p>
                                        </p> : <p>{user.username}</p>)}
                                    secondary={'Username'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={user.email}
                                    secondary={'Email'}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={user.bio? user.bio : 'Bio not given yet.'}
                                    secondary={'Bio'}
                                />
                            </ListItem>
                        </List>
                        </Typography>
                        
                    </CardContent>
                    <div className="w-full h-0.25 bg-red m-auto border-gray-100 border"></div>
                    <CardActions className="flex justify-end mx-2">
                        <Link to={"/profile/"+user.username+"/editprofile"} >
                            <button className="rounded-lg py-2 px-4 hover:bg-red-light hover:text-white font-poppins">
                                Edit Profile
                            </button>
                        </Link>
                    </CardActions>
            </Card>
            : <p className="text-2xl">Can't find profile</p>}
        </div>
        );
}