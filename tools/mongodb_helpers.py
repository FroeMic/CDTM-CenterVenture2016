#!/usr/bin/env python

from pymongo import MongoClient
from collections import namedtuple

DEFAULT_ADDRESS = 'localhost'
DEFAULT_PORT = 27017

DEFAULT_DB = 'aparata_db'
DEFAULT_ODS_COLLECTION = 'open_datasets'

RecordTemplate = namedtuple('Record',
                            ['name',
                             'description',
                             'location_type',
                             'url_csv',
                             'license_id',
                             'license_title',
                             'license_url',
                             'author',
                             'author_email',
                             'maintainer',
                             'maintainer_email',
                             'metadata_created',
                             'metadata_modified',
                             'image'])

LocationRecordMapping = namedtuple('LocationRecordMapping', 'latitude, longitude, district')
ValueRecordMapping = namedtuple('ValueMapping', 'value_description', 'value')


# class locationType(Enum):
#     district = 1
#     gcs_coordinates = 2
#     mixed = 3
#     undefined = 99



def connect_mongodb(uri=""):
    if not uri:
        client = MongoClient(DEFAULT_ADDRESS, DEFAULT_PORT)
    else:
        client = MongoClient(uri)

    return client


def get_db(client):
    return client[DEFAULT_DB]


def get_ods_collection(db):
    return db[DEFAULT_ODS_COLLECTION]


def insert_dataset(collection, RecordTemplate, LocationRecordMapping, ValueMapping, AdditionalData={}):
    pass
