import { Text, Input, Button, Row, Column, List, Logo, Icon } from "components"
import { useCallback, useState } from "react"
import { useMemo } from 'react';

const SECONDS_DEFAULT = 2

export const Home = () => {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState<{label: string}[]>([])
  const [seconds, setSeconds] = useState(SECONDS_DEFAULT)
  const [timer, setTimer] = useState<any>()
  const [stage,setStage] = useState('ready')

  const handleOkButton = () => {
    if(!taskName) return

    setTasks(previous => {
      const copy = [...previous];
      copy.push({label: taskName});
      return copy;
    })
    setTaskName('')
  }

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600
    const minutes = Math.floor(divisorMinute / 60 )
    const seconds = Math.ceil(divisorMinute % 60)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2,'0')}`
  }

  const startTimer = () => {
    setStage('in_progress')
    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if(previousSeconds === 0){
          clearInterval(timerInterval)
          setStage('finished')
          setTimer(undefined)
          return 0
        }
        return previousSeconds-1 
      })
    }, 1000)
    setTimer(timerInterval)
  }

  const handleRestartButton = useCallback(() => {
    setStage('ready');
    setSeconds(SECONDS_DEFAULT)
    clearInterval(timer)
    setTimer(undefined)
  }, [timer])

  const handlePauseButton = useCallback(() => {
    clearInterval(timer)
    setTimer(undefined)
  }, [timer])

  const handleStopButton = useCallback(() => {
    handlePauseButton()
    setSeconds(SECONDS_DEFAULT)
    setStage('ready')
  }, [handlePauseButton])

  const handleStageStatus = useMemo(() => {
    switch(stage){
      case 'ready':
        return 'Ready'
      case 'in_progress':
        return 'Time to work!'
      case 'finished':
        return 'Finished'
      default:
        return 'Ready'
    }
  }, [stage])

  const handleStageButtons = useMemo(() => {
    switch(stage){
      case 'ready':
        return (
          <>
            <Button variant="primary" onClick={() => startTimer()}>
              <Text color="primary" fontSize="ExtraLarge" fontWeight="bold" fontFamily="secondary">START</Text>
            </Button>
          </>
        )
      case 'in_progress':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="18px 28px" mx="5px" onClick={() => startTimer()}>
                <Icon variant="play"/>
              </Button>
              <Button variant="primary" p="18px 28px" mx="5px" onClick={() => handlePauseButton()}>
                <Icon variant="pause"/>
              </Button>
              <Button variant="primary" p="18px 28px" mx="5px" onClick={() => handleStopButton()}>
                <Icon variant="stop"/>
              </Button>
            </Row>
          </>
        )
      case 'finished':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="18px 28px" mx="5px" onClick={() => handleRestartButton()}>
                <Icon variant="restart"/>
              </Button>
              <Button variant="primary" p="18px 28px" mx="5px">
                <Icon variant="done"/>
              </Button>
            </Row>
          </>
        )
      default:
        return (
          <>
            <Button variant="primary" onClick={() => startTimer()}>
              <Text color="primary" fontSize="ExtraLarge" fontWeight="bold" fontFamily="secondary">START</Text>
            </Button>
          </>
        )
    }
  }, [handlePauseButton, handleStopButton, handleRestartButton, stage])

  return(
    <div>
      <Column width="600px" margin="0 auto">
        <Column width="100%" py="25px" alignItems="center">
          <Logo/>
        </Column>

        <Column width="100%" 
        minHeight="388px" 
        p="20px" 
        bg="rgba(255,255,255,0.2)" 
        borderRadius="4px" 
        alignItems="center">
          <Text fontSize="ExtraLarge" fontWeight="bold" fontFamily="secondary" pt="30px">{handleStageStatus}</Text>
          
          <Text fontSize="displayExtraLarge" fontWeight="bold" fontFamily="secondary" py="50px">{secondsToTime(seconds)}</Text>
          {handleStageButtons}
        </Column>

        <Text fontWeight={"bold"} mb="10px" fontSize="bodyLarge" paddingLeft="10px">Tasks</Text>
        <Row width="100%">
          <Input 
          flex={1} 
          placeholder="Enter a task name here..." 
          value={taskName} 
          onChange={(e: any) => setTaskName(e.target.value)}/>
          <Button variant="default" onClick={handleOkButton}>Ok</Button>
        </Row>
        <List items={tasks}/>
      </Column>
    </div>
  )
}