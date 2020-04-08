#!/bin/bash

tenants=("T1" "T2")

for i in {1..30}
do
   for i in "${tenants[@]}"
   do
	   echo $i
      CPU=$[ ( $RANDOM % 100 )  + 1 ]
      MEMORY=$[ ( $RANDOM % 100 )  + 1 ]
      echo "poc_cpu_usage{tenant=\"${i}\"} ${CPU}"
      echo "poc_cpu_usage{tenant=\"${i}\"} ${CPU}" | curl --data-binary @- http://0.0.0.0:9091/metrics/job/some_job
      echo "poc_memory_usage{tenant=\"${i}\"} ${MEMORY}"
      echo "poc_memory_usage{tenant=\"${i}\"} ${MEMORY}" | curl --data-binary @- http://0.0.0.0:9091/metrics/job/some_job
      sleep 60
   done
   sleep 5
done

